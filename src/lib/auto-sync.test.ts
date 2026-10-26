import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { syncOnce, type StoredBase, type SyncDeps } from "./auto-sync";
import { baseOf, type Entries } from "./sync-merge";
import { SyncConflictError, type CloudSnapshot, type SyncSession } from "./sync-client";
import type { PracticeBackup } from "./practice-backup";

const alice: SyncSession = {
  accessToken: "a",
  refreshToken: "r",
  userId: "00000000-0000-4000-8000-00000000000a",
  email: "alice@example.com",
  expiresAt: Date.now() + 3600000,
};
const bob: SyncSession = { ...alice, userId: "00000000-0000-4000-8000-00000000000b", email: "bob@example.com" };

const backupOf = (entries: Entries): PracticeBackup => ({
  format: "interview-practice",
  version: 1,
  exportedAt: "2026-01-01T00:00:00Z",
  entries,
});

class Cloud {
  rows = new Map<string, { revision: string; entries: Entries }>();
  calls: string[] = [];
  next = 0;
  /** Lets a test land another device's upload between this device's read and write. */
  beforeUpload?: () => Promise<unknown>;
  client: SyncDeps["client"] = {
    fresh: async (session) => session,
    revision: async (session) => {
      this.calls.push("revision");
      return this.rows.get(session.userId)?.revision ?? null;
    },
    read: async (session): Promise<CloudSnapshot | null> => {
      this.calls.push("read");
      const row = this.rows.get(session.userId);
      return row
        ? { user_id: session.userId, revision: row.revision, updated_at: "", backup: backupOf(row.entries) }
        : null;
    },
    upload: async (session, backup, expected) => {
      this.calls.push("upload");
      const hook = this.beforeUpload;
      this.beforeUpload = undefined;
      await hook?.();
      if ((this.rows.get(session.userId)?.revision ?? null) !== expected) throw new SyncConflictError();
      const revision = `rev-${++this.next}`;
      this.rows.set(session.userId, { revision, entries: { ...backup.entries } });
      return { user_id: session.userId, revision, updated_at: "", backup };
    },
  };
}

class Device {
  base: StoredBase | null = null;
  ownerId: string | null = null;
  deps: SyncDeps;
  constructor(
    public local: Entries,
    cloud: Cloud,
  ) {
    this.deps = {
      client: cloud.client,
      readLocal: () => ({ ...this.local }),
      applyLocal: (next) => {
        this.local = { ...next };
      },
      loadBase: (userId) => (this.base?.userId === userId ? this.base : null),
      saveBase: (userId, revision, entries) => {
        this.base = { userId, origin: "o", revision, ...baseOf(entries) };
      },
      owner: () => this.ownerId,
      setOwner: (userId) => {
        this.ownerId = userId;
      },
    };
  }
  sync(session = alice, choice?: "merge" | "replace") {
    return syncOnce(this.deps, session, choice);
  }
}

describe("automatic sync engine", () => {
  it("uploads a first device, merges a second, and brings both up to date", async () => {
    const cloud = new Cloud();
    const laptop = new Device({ "ip:code:a:python": "laptop" }, cloud);
    const phone = new Device({ "ip:code:b:python": "phone" }, cloud);
    await laptop.sync();
    await phone.sync();
    await laptop.sync();
    const both = { "ip:code:a:python": "laptop", "ip:code:b:python": "phone" };
    assert.deepEqual(laptop.local, both);
    assert.deepEqual(phone.local, both);
    assert.deepEqual(cloud.rows.get(alice.userId)?.entries, both);
  });

  it("does not download when nothing changed on either side", async () => {
    const cloud = new Cloud();
    const device = new Device({ "ip:code:a:python": "x" }, cloud);
    await device.sync();
    cloud.calls = [];
    await device.sync();
    assert.deepEqual(cloud.calls, ["revision"]);
  });

  it("keeps edits made offline on two devices and propagates deletions", async () => {
    const cloud = new Cloud();
    const laptop = new Device({ "ip:code:a:python": "a0", "ip:code:gone:python": "old" }, cloud);
    await laptop.sync();
    const phone = new Device({}, cloud);
    await phone.sync();
    laptop.local = { "ip:code:a:python": "a-laptop" };
    phone.local = { ...phone.local, "ip:code:c:python": "c-phone" };
    await laptop.sync();
    await phone.sync();
    await laptop.sync();
    const expected = { "ip:code:a:python": "a-laptop", "ip:code:c:python": "c-phone" };
    assert.deepEqual(phone.local, expected);
    assert.deepEqual(laptop.local, expected);
  });

  it("retries after another device uploads first, without losing either change", async () => {
    const cloud = new Cloud();
    const laptop = new Device({ "ip:code:a:python": "a" }, cloud);
    await laptop.sync();
    const phone = new Device({}, cloud);
    await phone.sync();
    laptop.local = { ...laptop.local, "ip:code:l:python": "laptop" };
    phone.local = { ...phone.local, "ip:code:p:python": "phone" };
    cloud.beforeUpload = () => phone.sync();
    await laptop.sync();
    assert.ok(cloud.calls.filter((call) => call === "upload").length >= 3, "the laptop retried");
    await phone.sync();
    const expected = { "ip:code:a:python": "a", "ip:code:l:python": "laptop", "ip:code:p:python": "phone" };
    assert.deepEqual(cloud.rows.get(alice.userId)?.entries, expected);
    assert.deepEqual(laptop.local, expected);
    assert.deepEqual(phone.local, expected);
  });

  it("asks before mixing another account's practice into a different account", async () => {
    const cloud = new Cloud();
    const shared = new Device({ "ip:code:a:python": "alice" }, cloud);
    await shared.sync(alice);
    shared.base = null; // Alice signed out.
    cloud.rows.set(bob.userId, { revision: "bob-1", entries: { "ip:code:b:python": "bob" } });
    cloud.calls = [];
    assert.equal((await shared.sync(bob)).kind, "needs-choice");
    assert.deepEqual(cloud.calls, [], "nothing is read or uploaded before the choice");
    await shared.sync(bob, "replace");
    assert.deepEqual(shared.local, { "ip:code:b:python": "bob" });
    assert.deepEqual(cloud.rows.get(alice.userId)?.entries, { "ip:code:a:python": "alice" });
  });

  it("merges another account's practice only when chosen", async () => {
    const cloud = new Cloud();
    const shared = new Device({ "ip:code:a:python": "mine" }, cloud);
    shared.ownerId = alice.userId;
    cloud.rows.set(bob.userId, { revision: "bob-1", entries: { "ip:code:b:python": "bob" } });
    await shared.sync(bob, "merge");
    assert.deepEqual(cloud.rows.get(bob.userId)?.entries, {
      "ip:code:a:python": "mine",
      "ip:code:b:python": "bob",
    });
    assert.equal(shared.ownerId, bob.userId);
  });

  it("re-seeds a deleted cloud snapshot instead of deleting local practice", async () => {
    const cloud = new Cloud();
    const device = new Device({ "ip:code:a:python": "keep me" }, cloud);
    await device.sync();
    cloud.rows.delete(alice.userId);
    await device.sync();
    assert.deepEqual(device.local, { "ip:code:a:python": "keep me" });
    assert.deepEqual(cloud.rows.get(alice.userId)?.entries, device.local);
  });

  it("restarts instead of overwriting practice typed during the download", async () => {
    const cloud = new Cloud();
    cloud.rows.set(alice.userId, { revision: "r1", entries: { "ip:code:c:python": "cloud" } });
    const device = new Device({ "ip:code:a:python": "1" }, cloud);
    let reads = 0;
    const readLocal = device.deps.readLocal;
    device.deps.readLocal = () => {
      // The person keeps typing between the first read and the apply.
      if (++reads === 2) device.local = { "ip:code:a:python": "2" };
      return readLocal();
    };
    await device.sync();
    assert.deepEqual(device.local, { "ip:code:a:python": "2", "ip:code:c:python": "cloud" });
    assert.deepEqual(cloud.rows.get(alice.userId)?.entries, device.local);
  });
});
