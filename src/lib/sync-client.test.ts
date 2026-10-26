import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
  clearSyncSession,
  compareSnapshots,
  readSyncSession,
  saveSyncSession,
  SyncAuthError,
  SyncClient,
  SyncConflictError,
  syncConfig,
  type SyncSession,
} from "./sync-client";
import { BACKUP_LIMIT, type PracticeBackup } from "./practice-backup";

const userId = "00000000-0000-4000-8000-000000000001";
const revision = "00000000-0000-4000-8000-000000000002";
const config = { url: "https://example.supabase.co", key: "public-test-key" };
const session: SyncSession = {
  userId,
  accessToken: "test-access-token",
  email: "test@example.com",
  expiresAt: Date.now() + 3600000,
};
const backup: PracticeBackup = {
  format: "interview-practice",
  version: 1,
  exportedAt: "2026-01-01T00:00:00Z",
  entries: { "ip:code:two-sum:python": "print(1)" },
};
const row = {
  user_id: userId,
  revision,
  updated_at: "2026-01-01T00:00:00Z",
  backup,
};
function mock(
  handler: (url: string, init: RequestInit) => Response | Promise<Response>,
): typeof fetch {
  return (async (url, init) =>
    handler(String(url), init ?? {})) as typeof fetch;
}
const json = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  });

describe("optional account sync", () => {
  it("stays unconfigured with absent settings and refuses insecure external endpoints", () => {
    assert.equal(syncConfig("", ""), null);
    for (const url of [
      "http://example.com",
      "https://user:secret@example.com",
      "https://example.com/path",
      "https://example.com?x=1",
    ])
      assert.throws(() => syncConfig(url, "key", false));
    assert.equal(
      syncConfig("http://localhost:54321", "key", true)?.url,
      "http://localhost:54321",
    );
    assert.throws(() => syncConfig("http://localhost:54321", "key", false));
    assert.throws(() =>
      syncConfig("https://example.com", "sb_secret_123", false),
    );
    assert.throws(() =>
      syncConfig(
        "https://example.com",
        `a.${btoa('{"role":"service_role"}')}.c`,
        false,
      ),
    );
  });
  it("sends only the explicit email OTP request and validates verification responses", async () => {
    const calls: string[] = [];
    const client = new SyncClient(
      config,
      mock((url, init) => {
        calls.push(url);
        assert.equal(init.credentials, "omit");
        assert.equal(init.redirect, "error");
        assert.equal(init.cache, "no-store");
        assert.equal(
          (init.headers as Record<string, string>).Authorization,
          undefined,
        );
        if (url.endsWith("/otp")) {
          assert.deepEqual(JSON.parse(String(init.body)), {
            email: "test@example.com",
            create_user: true,
          });
          return json({});
        }
        assert.equal(JSON.parse(String(init.body)).type, "email");
        return json({
          access_token: "bad",
          user: { id: "not-a-uuid" },
          expires_in: 3600,
        });
      }),
    );
    assert.equal(calls.length, 0);
    await client.sendCode("test@example.com");
    await assert.rejects(
      client.verifyCode("test@example.com", "123456"),
      /invalid sign-in session/,
    );
    assert.equal(calls.length, 2);
  });
  it("stores only the minimal tab session, scopes restoration to project, and clears it on sign-out failure", async () => {
    const values = new Map<string, string>();
    const prior = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        sessionStorage: {
          getItem: (key: string) => values.get(key) ?? null,
          setItem: (key: string, value: string) => values.set(key, value),
          removeItem: (key: string) => values.delete(key),
        },
      },
    });
    try {
      const client = new SyncClient(
        config,
        mock(() =>
          json({
            access_token: session.accessToken,
            refresh_token: "must-not-persist",
            expires_in: 3600,
            user: { id: userId, email: session.email },
          }),
        ),
      );
      const verified = await client.verifyCode(session.email, "123456");
      assert.deepEqual(readSyncSession(config), verified);
      assert.equal(values.size, 1);
      const [key, value] = [...values][0];
      assert.ok(!key.startsWith("ip:"));
      assert.ok(!value.includes("must-not-persist"));
      assert.equal(
        readSyncSession({ ...config, url: "https://other.supabase.co" }),
        null,
      );
      assert.equal(values.size, 0);
      saveSyncSession(config, session);
      await assert.rejects(
        new SyncClient(
          config,
          mock(() => {
            throw new Error("network failure");
          }),
        ).signOut(session),
      );
      assert.equal(values.size, 0);
      saveSyncSession(config, { ...session, expiresAt: 0 });
      assert.equal(readSyncSession(config), null);
      clearSyncSession();
    } finally {
      if (prior) Object.defineProperty(globalThis, "window", prior);
      else Reflect.deleteProperty(globalThis, "window");
    }
  });
  it("stops at expired sessions and surfaces auth, forbidden and throttled failures", async () => {
    let calls = 0;
    const expired = new SyncClient(
      config,
      mock(() => {
        calls++;
        return json([]);
      }),
    );
    await assert.rejects(
      expired.read({ ...session, expiresAt: 0 }),
      SyncAuthError,
    );
    assert.equal(calls, 0);
    for (const status of [401, 403, 429]) {
      const client = new SyncClient(
        config,
        mock(() => json({ message: "sensitive provider detail" }, status)),
      );
      await assert.rejects(
        client.read(session),
        (error) =>
          error instanceof Error &&
          !error.message.includes("sensitive provider detail") &&
          (status !== 401 || error instanceof SyncAuthError),
      );
    }
  });
  it("scopes every read by account and refuses a returned row owned by another account", async () => {
    const client = new SyncClient(
      config,
      mock((url, init) => {
        assert.equal(new URL(url).searchParams.get("user_id"), `eq.${userId}`);
        assert.equal(
          (init.headers as Record<string, string>).Authorization,
          "Bearer test-access-token",
        );
        return json([{ ...row, user_id: revision }]);
      }),
    );
    await assert.rejects(client.read(session), /invalid account snapshot/);
  });
  it("validates remote backup data before exposing it for import", async () => {
    for (const invalid of [
      { ...backup, version: 99 },
      { ...backup, entries: { "ip:auth:token": "secret" } },
      { ...backup, entries: { "ip:progress:v1": "not-json" } },
    ]) {
      const client = new SyncClient(
        config,
        mock(() => json([{ ...row, backup: invalid }])),
      );
      await assert.rejects(client.read(session));
    }
    assert.deepEqual(
      (
        await new SyncClient(
          config,
          mock(() => json([row])),
        ).read(session)
      )?.backup,
      backup,
    );
    const encoded = new TextEncoder().encode(JSON.stringify([row]));
    const chunked = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoded.slice(0, 20));
        controller.enqueue(encoded.slice(20));
        controller.close();
      },
    });
    assert.deepEqual(
      (await new SyncClient(config, mock(() => new Response(chunked))).read(session))?.backup,
      backup,
    );
    let cancelled = false;
    const oversized = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array(BACKUP_LIMIT + 1024 * 1024 + 1));
      },
      cancel() {
        cancelled = true;
      },
    });
    await assert.rejects(
      new SyncClient(config, mock(() => new Response(oversized))).read(session),
      /Cloud response is too large/,
    );
    assert.equal(cancelled, true);
  });
  it("validates uploads before any network mutation", async () => {
    let calls = 0;
    const client = new SyncClient(
      config,
      mock(() => {
        calls++;
        return json([row]);
      }),
    );
    await assert.rejects(
      client.upload(
        session,
        { ...backup, entries: { "ip:auth:token": "secret" } },
        revision,
      ),
    );
    assert.equal(calls, 0);
  });
  it("uses compare-and-set revisions for updates/deletes and never upserts first uploads", async () => {
    const client = new SyncClient(
      config,
      mock((url, init) => {
        assert.equal(
          (init.headers as Record<string, string>).Prefer,
          "return=representation",
        );
        if (init.method === "POST") {
          assert.equal(url, `${config.url}/rest/v1/practice_snapshots`);
          return json({}, 409);
        }
        const requestUrl = new URL(url);
        assert.equal(requestUrl.searchParams.get("revision"), `eq.${revision}`);
        assert.equal(requestUrl.searchParams.get("user_id"), `eq.${userId}`);
        return json([]);
      }),
    );
    await assert.rejects(
      client.upload(session, backup, null),
      SyncConflictError,
    );
    await assert.rejects(
      client.upload(session, backup, revision),
      SyncConflictError,
    );
    await assert.rejects(client.delete(session, revision), SyncConflictError);
    await assert.rejects(
      client.delete(session, "invalid"),
      /Invalid cloud revision/,
    );
    assert.deepEqual(backup.entries, { "ip:code:two-sum:python": "print(1)" });
  });
  it("accepts an authorized successful upload and delete", async () => {
    const client = new SyncClient(
      config,
      mock((_url, init) => {
        if (init.method === "DELETE") return json([row]);
        const body = JSON.parse(String(init.body));
        assert.equal(body.user_id, userId);
        assert.deepEqual(body.backup, backup);
        assert.notEqual(body.revision, revision);
        return json([{ ...body, revision }]);
      }),
    );
    assert.equal(
      (await client.upload(session, backup, null)).revision,
      revision,
    );
    await client.delete(session, revision);
  });
  it("reports comparisons without mutating copies", () => {
    const other = {
      ...backup,
      entries: {
        "ip:code:two-sum:python": "print(2)",
        "ip:code:three-sum:python": "pass",
      },
    };
    assert.deepEqual(compareSnapshots(backup, other), {
      local: 1,
      cloud: 2,
      changed: 1,
      localOnly: 0,
      cloudOnly: 1,
    });
    assert.deepEqual(compareSnapshots(null, null), {
      local: 0,
      cloud: 0,
      changed: 0,
      localOnly: 0,
      cloudOnly: 0,
    });
  });
  it("ships explicit ownership policies for each operation and server-owned revisions", () => {
    const sql = readFileSync(
      new URL("../../supabase/migrations/account_sync.sql", import.meta.url),
      "utf8",
    );
    assert.match(sql, /enable row level security/);
    assert.match(sql, /force row level security/);
    for (const op of ["select", "insert", "update", "delete"])
      assert.ok(sql.includes(`for ${op} to authenticated`));
    assert.equal(
      (sql.match(/\(select auth.uid\(\)\) = user_id/g) ?? []).length,
      5,
    );
    assert.match(
      sql,
      /revoke all on public.practice_snapshots from public, anon/,
    );
    assert.match(sql, /new.revision := gen_random_uuid\(\)/);
    assert.doesNotMatch(sql, /security definer/i);
  });
});
