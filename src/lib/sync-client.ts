import {
  BACKUP_LIMIT,
  parseBackup,
  type PracticeBackup,
} from "./practice-backup";

export interface SyncConfig {
  url: string;
  key: string;
}
export interface SyncSession {
  accessToken: string;
  userId: string;
  email: string;
  expiresAt: number;
}
export interface CloudSnapshot {
  user_id: string;
  revision: string;
  updated_at: string;
  backup: PracticeBackup;
}
const SESSION_KEY = "interview-practice:cloud-session:v1";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export class SyncAuthError extends Error {}
export class SyncConflictError extends Error {
  constructor() {
    super(
      "Cloud data changed in another tab or device. Both copies are preserved. Compare again before continuing.",
    );
  }
}

export function syncConfig(
  url = process.env.NEXT_PUBLIC_SUPABASE_URL,
  key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  development = process.env.NODE_ENV === "development",
): SyncConfig | null {
  if (!url || !key) return null;
  if (url !== url.trim())
    throw new Error(
      "Cloud sync project URL must not contain surrounding whitespace.",
    );
  const parsed = new URL(url);
  if (
    parsed.username ||
    parsed.password ||
    parsed.search ||
    parsed.hash ||
    (parsed.pathname !== "/" && parsed.pathname !== "")
  )
    throw new Error("Cloud sync requires a project origin URL.");
  if (
    parsed.protocol !== "https:" &&
    !(
      development &&
      parsed.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname)
    )
  )
    throw new Error(
      "Cloud sync requires HTTPS (HTTP localhost is allowed only in development).",
    );
  if (key.startsWith("sb_secret_"))
    throw new Error("Use a public Supabase key, never a secret key.");
  // Reject legacy service-role JWTs too. This check is defense in depth, not authorization.
  try {
    if (
      JSON.parse(
        atob(key.split(".")[1].replaceAll("-", "+").replaceAll("_", "/")),
      ).role === "service_role"
    )
      throw new Error("service-role");
  } catch (error) {
    if (error instanceof Error && error.message === "service-role")
      throw new Error("Use the public anon key, never service_role.");
  }
  return { url: parsed.origin, key };
}

export function clearSyncSession() {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* Session may be memory-only. */
  }
}
export function saveSyncSession(config: SyncConfig, session: SyncSession) {
  try {
    window.sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ origin: config.url, ...session }),
    );
  } catch {
    /* Remain signed in for this page only. */
  }
}
export function readSyncSession(config: SyncConfig): SyncSession | null {
  try {
    const session = JSON.parse(
      window.sessionStorage.getItem(SESSION_KEY) || "null",
    );
    if (
      session?.origin === config.url &&
      typeof session.accessToken === "string" &&
      UUID.test(session.userId) &&
      typeof session.email === "string" &&
      typeof session.expiresAt === "number" &&
      Number.isFinite(session.expiresAt) &&
      session.expiresAt > Date.now() + 5000
    )
      return {
        accessToken: session.accessToken,
        userId: session.userId,
        email: session.email,
        expiresAt: session.expiresAt,
      };
  } catch {
    /* Unavailable or damaged session. */
  }
  clearSyncSession();
  return null;
}

export class SyncClient {
  constructor(
    private config: SyncConfig,
    private fetcher: typeof fetch = fetch,
  ) {}
  private async request(
    path: string,
    init: RequestInit = {},
    session?: SyncSession,
  ): Promise<unknown> {
    if (session && session.expiresAt <= Date.now() + 5000) {
      clearSyncSession();
      throw new SyncAuthError(
        "Session expired. Sign in again; local data is safe.",
      );
    }
    let response: Response;
    try {
      response = await this.fetcher(`${this.config.url}${path}`, {
        ...init,
        cache: "no-store",
        credentials: "omit",
        redirect: "error",
        signal: AbortSignal.timeout(30000),
        headers: {
          apikey: this.config.key,
          "Content-Type": "application/json",
          ...(session
            ? { Authorization: `Bearer ${session.accessToken}` }
            : {}),
          ...init.headers,
        },
      });
    } catch {
      throw new Error(
        "Could not reach cloud sync. Check your connection and try again. Local data is safe.",
      );
    }
    if (response.status === 401) {
      clearSyncSession();
      throw new SyncAuthError(
        "Sign-in expired or was rejected. Sign in again; local data is safe.",
      );
    }
    if (response.status === 409) throw new SyncConflictError();
    if (!response.ok)
      throw new Error(
        response.status === 429
          ? "Too many attempts. Wait before trying again."
          : `Cloud request failed (${response.status}). Check account permissions and setup. Local data is safe.`,
      );
    const length = Number(response.headers.get("content-length"));
    if (length > BACKUP_LIMIT + 1024 * 1024)
      throw new Error("Cloud response is too large.");
    if (!response.body) return null;
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > BACKUP_LIMIT + 1024 * 1024) {
        await reader.cancel();
        throw new Error("Cloud response is too large.");
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const text = new TextDecoder().decode(bytes);
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      throw new Error("Cloud returned an invalid response.");
    }
  }
  async sendCode(email: string) {
    await this.request("/auth/v1/otp", {
      method: "POST",
      body: JSON.stringify({ email, create_user: true }),
    });
  }
  async verifyCode(email: string, token: string): Promise<SyncSession> {
    const data = (await this.request("/auth/v1/verify", {
      method: "POST",
      body: JSON.stringify({ email, token, type: "email" }),
    })) as Record<string, unknown>;
    const user = data?.user as Record<string, unknown> | undefined;
    if (
      typeof data?.access_token !== "string" ||
      !user ||
      typeof user.id !== "string" ||
      !UUID.test(user.id) ||
      typeof data.expires_in !== "number" ||
      !Number.isFinite(data.expires_in) ||
      data.expires_in <= 0 ||
      data.expires_in > 86400 ||
      typeof user.email !== "string"
    )
      throw new Error("Cloud returned an invalid sign-in session.");
    const session = {
      accessToken: data.access_token,
      userId: user.id,
      email: user.email,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
    saveSyncSession(this.config, session);
    return session;
  }
  async signOut(session: SyncSession) {
    try {
      await this.request(
        "/auth/v1/logout?scope=local",
        { method: "POST" },
        session,
      );
    } finally {
      clearSyncSession();
    }
  }
  private path(session: SyncSession) {
    if (!UUID.test(session.userId)) throw new Error("Invalid account ID.");
    return `/rest/v1/practice_snapshots?user_id=eq.${session.userId}`;
  }
  private snapshot(value: unknown, session: SyncSession): CloudSnapshot {
    const row = value as CloudSnapshot;
    if (
      !row ||
      row.user_id !== session.userId ||
      !UUID.test(row.revision) ||
      !Number.isFinite(Date.parse(row.updated_at))
    )
      throw new Error("Cloud returned an invalid account snapshot.");
    return { ...row, backup: parseBackup(JSON.stringify(row.backup)) };
  }
  async read(session: SyncSession): Promise<CloudSnapshot | null> {
    const rows = await this.request(
      `${this.path(session)}&select=user_id,revision,updated_at,backup&limit=1`,
      {},
      session,
    );
    if (!Array.isArray(rows) || rows.length > 1)
      throw new Error("Cloud returned an invalid snapshot list.");
    return rows.length ? this.snapshot(rows[0], session) : null;
  }
  async upload(
    session: SyncSession,
    backup: PracticeBackup,
    expectedRevision: string | null,
  ): Promise<CloudSnapshot> {
    const validated = parseBackup(JSON.stringify(backup));
    if (expectedRevision !== null && !UUID.test(expectedRevision))
      throw new Error("Invalid cloud revision.");
    const row = {
      user_id: session.userId,
      revision: crypto.randomUUID(),
      updated_at: new Date().toISOString(),
      backup: validated,
    };
    const rows = await this.request(
      expectedRevision === null
        ? "/rest/v1/practice_snapshots"
        : `${this.path(session)}&revision=eq.${expectedRevision}`,
      {
        method: expectedRevision === null ? "POST" : "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(row),
      },
      session,
    );
    if (!Array.isArray(rows) || rows.length !== 1)
      throw new SyncConflictError();
    return this.snapshot(rows[0], session);
  }
  async delete(session: SyncSession, expectedRevision: string) {
    if (!UUID.test(expectedRevision))
      throw new Error("Invalid cloud revision.");
    const rows = await this.request(
      `${this.path(session)}&revision=eq.${expectedRevision}`,
      { method: "DELETE", headers: { Prefer: "return=representation" } },
      session,
    );
    if (!Array.isArray(rows) || rows.length !== 1)
      throw new SyncConflictError();
  }
}

export function compareSnapshots(
  local: PracticeBackup | null,
  remote: PracticeBackup | null,
) {
  const a = local?.entries ?? {};
  const b = remote?.entries ?? {};
  return {
    local: Object.keys(a).length,
    cloud: Object.keys(b).length,
    changed: Object.keys(a).filter((key) => key in b && a[key] !== b[key])
      .length,
    localOnly: Object.keys(a).filter((key) => !(key in b)).length,
    cloudOnly: Object.keys(b).filter((key) => !(key in a)).length,
  };
}
