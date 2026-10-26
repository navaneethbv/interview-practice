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
  refreshToken: string;
  userId: string;
  email: string;
  expiresAt: number;
}
export type OAuthProvider = "github" | "google";
export interface CloudSnapshot {
  user_id: string;
  revision: string;
  updated_at: string;
  backup: PracticeBackup;
}
// Outside the "ip:" prefix so backups and cloud snapshots never contain tokens.
export const SESSION_KEY = "interview-practice:cloud-session:v2";
const LEGACY_SESSION_KEY = "interview-practice:cloud-session:v1";
const PKCE_KEY = "interview-practice:pkce:v1";
const PKCE_TTL = 60 * 60 * 1000;
/** Same-tab notification; other tabs observe the localStorage "storage" event. */
export const SESSION_EVENT = "interview-practice:session";
/** Refresh this long before expiry so requests never race the deadline. */
const REFRESH_MARGIN = 60_000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
async function readBoundedChunks(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  chunks: Uint8Array[],
  size = 0,
): Promise<number> {
  const { done, value } = await reader.read();
  if (done) return size;
  const nextSize = size + value.byteLength;
  if (nextSize > BACKUP_LIMIT + 1024 * 1024) {
    await reader.cancel();
    throw new Error("Cloud response is too large.");
  }
  chunks.push(value);
  return readBoundedChunks(reader, chunks, nextSize);
}
export class SyncAuthError extends Error {}
export class SyncHttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}
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

function announceSession() {
  try {
    window.dispatchEvent(new Event(SESSION_EVENT));
  } catch {
    /* No window outside the browser. */
  }
}
/** OAuth buttons to offer. Providers must also be enabled in the Supabase project,
 * so each one is opt-in per deployment, e.g. NEXT_PUBLIC_AUTH_PROVIDERS=github,google. */
export function oauthProviders(
  value = process.env.NEXT_PUBLIC_AUTH_PROVIDERS,
): OAuthProvider[] {
  const requested = new Set((value ?? "").split(",").map((name) => name.trim().toLowerCase()));
  return (["github", "google"] as const).filter((name) => requested.has(name));
}

export function clearSyncSession() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(LEGACY_SESSION_KEY);
  } catch {
    /* Session may be memory-only. */
  }
  announceSession();
}
export function saveSyncSession(config: SyncConfig, session: SyncSession) {
  try {
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ origin: config.url, ...session }),
    );
  } catch {
    /* Remain signed in for this page only. */
  }
  announceSession();
}
/** The stored session for this project, even if its access token has expired:
 * the refresh token can still renew it. */
export function readSyncSession(config: SyncConfig): SyncSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (raw === null) return null;
    const session = JSON.parse(raw);
    if (
      session?.origin === config.url &&
      typeof session.accessToken === "string" &&
      typeof session.refreshToken === "string" &&
      session.refreshToken.length > 0 &&
      UUID.test(session.userId) &&
      typeof session.email === "string" &&
      typeof session.expiresAt === "number" &&
      Number.isFinite(session.expiresAt)
    )
      return {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
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

function base64Url(bytes: Uint8Array) {
  return btoa(String.fromCodePoint(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}
/** Only same-origin relative paths survive the OAuth round trip. */
export function safeReturnPath(path: unknown): string {
  return typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.includes("\\")
    ? path
    : "/";
}

export class SyncClient {
  constructor(
    private readonly config: SyncConfig,
    private readonly fetcher: typeof fetch = fetch,
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
      throw new SyncHttpError(
        response.status,
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
    const size = await readBoundedChunks(reader, chunks);
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
  private sessionFrom(value: unknown): SyncSession {
    const data = value as Record<string, unknown> | null;
    const user = data?.user as Record<string, unknown> | undefined;
    if (
      typeof data?.access_token !== "string" ||
      typeof data.refresh_token !== "string" ||
      !data.refresh_token ||
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
      refreshToken: data.refresh_token,
      userId: user.id,
      email: user.email,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
    saveSyncSession(this.config, session);
    return session;
  }
  /** Emails a sign-in message. With `link`, the email's link completes a PKCE
   * sign-in at `link.callbackUrl` in this browser; the email may also carry a
   * code for `verifyCode` when the project's template includes one. */
  async sendCode(email: string, link?: { callbackUrl: string; returnTo: string }) {
    const pkce = link ? await this.startPkce(link.returnTo) : null;
    const query = link ? `?${new URLSearchParams({ redirect_to: link.callbackUrl })}` : "";
    await this.request(`/auth/v1/otp${query}`, {
      method: "POST",
      body: JSON.stringify({
        email,
        create_user: true,
        ...(pkce ? { code_challenge: pkce, code_challenge_method: "s256" } : {}),
      }),
    });
  }
  async verifyCode(email: string, token: string): Promise<SyncSession> {
    return this.sessionFrom(
      await this.request("/auth/v1/verify", {
        method: "POST",
        body: JSON.stringify({ email, token, type: "email" }),
      }),
    );
  }
  /** Returns a session whose access token is valid for at least a minute,
   * renewing it with the refresh token when needed. */
  async fresh(session: SyncSession): Promise<SyncSession> {
    if (session.expiresAt > Date.now() + REFRESH_MARGIN) return session;
    // Another tab may already have rotated the refresh token.
    const stored = readSyncSession(this.config);
    if (
      stored?.userId === session.userId &&
      stored.expiresAt > Date.now() + REFRESH_MARGIN
    )
      return stored;
    const current = stored?.userId === session.userId ? stored : session;
    try {
      return this.sessionFrom(
        await this.request("/auth/v1/token?grant_type=refresh_token", {
          method: "POST",
          body: JSON.stringify({ refresh_token: current.refreshToken }),
        }),
      );
    } catch (error) {
      // A rejected refresh token ends the session; a network failure does not.
      if (
        error instanceof SyncAuthError ||
        (error instanceof SyncHttpError && error.status === 400)
      ) {
        clearSyncSession();
        throw new SyncAuthError(
          "Your sign-in expired. Sign in again; local practice is safe.",
        );
      }
      throw error;
    }
  }
  /** Stores a single-use verifier and returns its S256 challenge. localStorage,
   * not sessionStorage, because an emailed link opens in a new tab. */
  private async startPkce(returnTo: string): Promise<string> {
    const verifier = base64Url(crypto.getRandomValues(new Uint8Array(32)));
    const challenge = base64Url(
      new Uint8Array(
        await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)),
      ),
    );
    try {
      window.localStorage.setItem(
        PKCE_KEY,
        JSON.stringify({
          verifier,
          origin: this.config.url,
          returnTo: safeReturnPath(returnTo),
          expiresAt: Date.now() + PKCE_TTL,
        }),
      );
    } catch {
      throw new Error(
        "This browser blocked storage, which sign-in needs. Allow site data and try again.",
      );
    }
    return challenge;
  }
  /** Starts the PKCE authorization-code flow; the browser returns to `callbackUrl`. */
  async oauthUrl(
    provider: OAuthProvider,
    callbackUrl: string,
    returnTo: string,
  ): Promise<string> {
    const params = new URLSearchParams({
      provider,
      redirect_to: callbackUrl,
      code_challenge: await this.startPkce(returnTo),
      code_challenge_method: "s256",
    });
    return `${this.config.url}/auth/v1/authorize?${params}`;
  }
  /** Completes the PKCE flow and returns the session and where to go next. */
  async exchangeCode(code: string): Promise<{ session: SyncSession; returnTo: string }> {
    let pending: {
      verifier?: unknown;
      origin?: unknown;
      returnTo?: unknown;
      expiresAt?: unknown;
    } | null = null;
    try {
      pending = JSON.parse(window.localStorage.getItem(PKCE_KEY) ?? "null");
      window.localStorage.removeItem(PKCE_KEY);
    } catch {
      /* Treated as a missing sign-in attempt below. */
    }
    if (
      typeof pending?.verifier !== "string" ||
      pending.origin !== this.config.url ||
      typeof pending.expiresAt !== "number" ||
      pending.expiresAt < Date.now()
    )
      throw new Error(
        "This sign-in link was started in another browser or has expired. Open it in the browser where you asked for it, or start sign-in again.",
      );
    const session = this.sessionFrom(
      await this.request("/auth/v1/token?grant_type=pkce", {
        method: "POST",
        body: JSON.stringify({ auth_code: code, code_verifier: pending.verifier }),
      }),
    );
    return { session, returnTo: safeReturnPath(pending.returnTo) };
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
  /** Cheap check of the cloud revision, without downloading the snapshot. */
  async revision(session: SyncSession): Promise<string | null> {
    const rows = await this.request(
      `${this.path(session)}&select=revision&limit=1`,
      {},
      session,
    );
    if (!Array.isArray(rows) || rows.length > 1)
      throw new Error("Cloud returned an invalid snapshot list.");
    const revision = (rows[0] as { revision?: unknown } | undefined)?.revision;
    if (revision === undefined) return null;
    if (typeof revision !== "string" || !UUID.test(revision))
      throw new Error("Cloud returned an invalid revision.");
    return revision;
  }
  private path(session: SyncSession) {
    if (!UUID.test(session.userId)) throw new Error("Invalid account ID.");
    return `/rest/v1/practice_snapshots?user_id=eq.${session.userId}`;
  }
  private snapshot(value: unknown, session: SyncSession): CloudSnapshot {
    const row = value as CloudSnapshot;
    if (
      row?.user_id !== session.userId ||
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
