"use client";

import { useSyncExternalStore } from "react";
import { exportPractice, parseBackup, type PracticeBackup } from "./practice-backup";
import { pendingWriteCount, restoreEntries, safeRemove, subscribeWrites } from "./storage";
import {
  baseOf,
  EMPTY_BASE,
  mergeEntries,
  unchangedSince,
  type Entries,
  type SyncBase,
} from "./sync-merge";
import {
  readSyncSession,
  SESSION_EVENT,
  SESSION_KEY,
  SyncAuthError,
  SyncClient,
  SyncConflictError,
  syncConfig,
  type SyncConfig,
  type SyncSession,
} from "./sync-client";

/**
 * Background sync for signed-in users. Practice stays in localStorage and keeps
 * working offline; this engine merges it with the account's cloud snapshot after
 * changes, on focus, when the browser comes back online and periodically.
 */

const BASE_KEY = "interview-practice:sync-base:v1";
/** The account whose data this browser last synced, kept after sign-out. */
const OWNER_KEY = "interview-practice:sync-owner:v1";
const DEBOUNCE_MS = 4000;
const INTERVAL_MS = 60_000;
const ATTEMPTS = 3;

export interface StoredBase extends SyncBase {
  userId: string;
  origin: string;
  revision: string | null;
}

export interface SyncDeps {
  client: Pick<SyncClient, "fresh" | "revision" | "read" | "upload">;
  readLocal(): Entries;
  applyLocal(next: Entries, previous: Entries): void;
  loadBase(userId: string): StoredBase | null;
  saveBase(userId: string, revision: string | null, entries: Entries): void;
  owner(): string | null;
  setOwner(userId: string): void;
}

export type SyncChoice = "merge" | "replace";
export type SyncOutcome =
  | { kind: "synced"; session: SyncSession; at: number }
  | { kind: "needs-choice"; session: SyncSession };

const asBackup = (entries: Entries): PracticeBackup => ({
  format: "interview-practice",
  version: 1,
  exportedAt: new Date().toISOString(),
  entries,
});
const sameEntries = (a: Entries, b: Entries) =>
  Object.keys(a).length === Object.keys(b).length &&
  Object.entries(a).every(([key, value]) => b[key] === value);

/**
 * One sync pass. `choice` resolves the first sync of an account in a browser that
 * holds another account's practice: "merge" keeps both, "replace" adopts the cloud copy.
 */
export async function syncOnce(
  deps: SyncDeps,
  signedIn: SyncSession,
  choice?: SyncChoice,
): Promise<SyncOutcome> {
  for (let attempt = 1; ; attempt++) {
    const session = await deps.client.fresh(signedIn);
    const local = deps.readLocal();
    const stored = deps.loadBase(session.userId);
    // Nothing changed here; skip the download unless the cloud moved on.
    if (
      stored &&
      unchangedSince(stored, local) &&
      (await deps.client.revision(session)) === stored.revision
    )
      return { kind: "synced", session, at: Date.now() };
    const owner = deps.owner();
    if (!stored && !choice && Object.keys(local).length && owner && owner !== session.userId)
      return { kind: "needs-choice", session };
    const cloud = await deps.client.read(session);
    const cloudEntries = cloud?.backup.entries ?? {};
    // A snapshot that vanished was deleted, not emptied key by key: re-seed it from
    // this browser instead of deleting everything the base says the cloud once had.
    const base = stored && (cloud || stored.revision === null) ? stored : EMPTY_BASE;
    const merged =
      choice === "replace" && !stored
        ? cloudEntries
        : mergeEntries(base, local, cloudEntries);
    if (!sameEntries(merged, local)) {
      // Practice continued while downloading: start over rather than overwrite it.
      if (!sameEntries(deps.readLocal(), local)) {
        if (attempt < ATTEMPTS) continue;
        throw new Error("Practice kept changing during sync. It will retry shortly.");
      }
      deps.applyLocal(merged, local);
    }
    let revision = cloud?.revision ?? null;
    if (Object.keys(merged).length && !sameEntries(merged, cloudEntries)) {
      try {
        revision = (await deps.client.upload(session, asBackup(merged), revision)).revision;
      } catch (error) {
        // Another device uploaded first. Local now holds the merge, so the next
        // attempt merges it with that device's copy.
        if (error instanceof SyncConflictError && attempt < ATTEMPTS) {
          deps.saveBase(session.userId, cloud?.revision ?? null, cloudEntries);
          continue;
        }
        throw error;
      }
    }
    deps.saveBase(session.userId, revision, merged);
    deps.setOwner(session.userId);
    return { kind: "synced", session, at: Date.now() };
  }
}

/* ------------------------------------------------------------ browser dependencies */

function readJson(key: string): unknown {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

export function readLocalEntries(): Entries {
  try {
    return parseBackup(exportPractice()).entries;
  } catch (error) {
    if (error instanceof Error && error.message === "The backup contains no practice data.")
      return {};
    throw error;
  }
}

let applying = false;
function applyLocal(next: Entries, previous: Entries) {
  const sets = Object.fromEntries(
    Object.entries(next).filter(([key, value]) => previous[key] !== value),
  );
  const removals = Object.keys(previous).filter((key) => !Object.hasOwn(next, key));
  applying = true;
  try {
    for (const key of removals) safeRemove(key);
    if (Object.keys(sets).length) restoreEntries(sets);
    else if (removals.length) window.dispatchEvent(new StorageEvent("storage", { key: null }));
  } finally {
    applying = false;
  }
}

function browserDeps(config: SyncConfig): SyncDeps {
  return {
    client: new SyncClient(config),
    readLocal: readLocalEntries,
    applyLocal,
    loadBase(userId) {
      const base = readJson(BASE_KEY) as StoredBase | null;
      return base?.userId === userId &&
        base.origin === config.url &&
        typeof base.fingerprints === "object" &&
        base.fingerprints !== null
        ? base
        : null;
    },
    saveBase(userId, revision, entries) {
      const value: StoredBase = { userId, origin: config.url, revision, ...baseOf(entries) };
      try {
        window.localStorage.setItem(BASE_KEY, JSON.stringify(value));
      } catch {
        // Without a base the next pass merges as a first sync: nothing is lost,
        // but deletions made on one device may come back from the other.
        try {
          window.localStorage.removeItem(BASE_KEY);
        } catch {
          /* Storage unavailable. */
        }
      }
    },
    owner: () => {
      const owner = readJson(OWNER_KEY);
      return typeof owner === "string" ? owner : null;
    },
    setOwner(userId) {
      try {
        window.localStorage.setItem(OWNER_KEY, JSON.stringify(userId));
      } catch {
        /* Only affects the account-switch prompt. */
      }
    },
  };
}

/** Forget this browser's sync state on sign-out, optionally removing its practice data. */
export function forgetSyncState(removePractice: boolean) {
  try {
    window.localStorage.removeItem(BASE_KEY);
    if (removePractice) window.localStorage.removeItem(OWNER_KEY);
  } catch {
    /* Storage unavailable: nothing persisted to forget. */
  }
  if (removePractice) applyLocal({}, readLocalEntries());
}

/* ------------------------------------------------------------------- engine state */

export type AutoSyncStatus =
  | { state: "off" }
  | { state: "signed-out" }
  | { state: "syncing"; email: string; lastSyncedAt?: number }
  | { state: "synced"; email: string; lastSyncedAt: number }
  | { state: "needs-choice"; email: string }
  | { state: "error"; email: string; message: string; lastSyncedAt?: number };

let status: AutoSyncStatus = { state: "off" };
const statusListeners = new Set<() => void>();
function setStatus(next: AutoSyncStatus) {
  status = next;
  statusListeners.forEach((listener) => listener());
}
const lastSyncedAt = () => ("lastSyncedAt" in status ? status.lastSyncedAt : undefined);
function subscribeStatus(listener: () => void) {
  statusListeners.add(listener);
  return () => {
    statusListeners.delete(listener);
  };
}
const OFF: AutoSyncStatus = { state: "off" };
export function useAutoSyncStatus(): AutoSyncStatus {
  return useSyncExternalStore(subscribeStatus, () => status, () => OFF);
}

let running: Promise<void> | null = null;
let rerun = false;

async function withLock(task: () => Promise<void>): Promise<void> {
  // One tab syncs at a time; the others read its results from localStorage.
  const locks = typeof navigator === "undefined" ? undefined : navigator.locks;
  if (locks) await locks.request("interview-practice-sync", task);
  else await task();
}

async function runPass(choice?: SyncChoice) {
  let config: SyncConfig | null = null;
  try {
    config = syncConfig();
  } catch {
    /* Misconfiguration is reported on the settings page. */
  }
  if (!config) return setStatus({ state: "off" });
  const session = readSyncSession(config);
  if (!session) return setStatus({ state: "signed-out" });
  if (pendingWriteCount())
    return setStatus({
      state: "error",
      email: session.email,
      message:
        "Browser storage is refusing writes, so sync is paused. Free some space or export a backup.",
      lastSyncedAt: lastSyncedAt(),
    });
  setStatus({ state: "syncing", email: session.email, lastSyncedAt: lastSyncedAt() });
  try {
    let outcome: SyncOutcome | undefined;
    const deps = browserDeps(config);
    await withLock(async () => {
      outcome = await syncOnce(deps, session, choice);
    });
    setStatus(
      outcome?.kind === "needs-choice"
        ? { state: "needs-choice", email: session.email }
        : { state: "synced", email: session.email, lastSyncedAt: outcome?.at ?? Date.now() },
    );
  } catch (error) {
    if (error instanceof SyncAuthError) return setStatus({ state: "signed-out" });
    setStatus({
      state: "error",
      email: session.email,
      message: error instanceof Error ? error.message : "Sync failed. Local practice is safe.",
      lastSyncedAt: lastSyncedAt(),
    });
  }
}

/** Runs a sync pass now, or queues one after the pass already in progress. */
export function syncNow(choice?: SyncChoice): Promise<void> {
  if (running) {
    if (!choice) {
      rerun = true;
      return running;
    }
    return running.then(() => syncNow(choice));
  }
  running = runPass(choice).finally(() => {
    running = null;
    if (rerun) {
      rerun = false;
      void syncNow();
    }
  });
  return running;
}

function install(): () => void {
  let timer: number | undefined;
  const paused = () =>
    status.state === "off" || status.state === "signed-out" || status.state === "needs-choice";
  const schedule = (delay: number) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = undefined;
      void syncNow();
    }, delay);
  };
  const onWrite = () => {
    if (!applying && !paused()) schedule(DEBOUNCE_MS);
  };
  const onVisible = () => {
    if (document.visibilityState === "visible" && !paused()) schedule(0);
  };
  const onSession = () => schedule(0);
  const onStorage = (event: StorageEvent) => {
    if (event.key === SESSION_KEY) onSession();
  };
  const onOnline = () => {
    if (!paused()) schedule(0);
  };
  // Flush a debounced change before the page goes away.
  const onHide = () => {
    if (timer !== undefined && !paused()) {
      window.clearTimeout(timer);
      timer = undefined;
      void syncNow();
    }
  };
  const unsubscribe = subscribeWrites(onWrite);
  const interval = window.setInterval(() => {
    if (document.visibilityState === "visible" && !paused()) void syncNow();
  }, INTERVAL_MS);
  document.addEventListener("visibilitychange", onVisible);
  window.addEventListener(SESSION_EVENT, onSession);
  window.addEventListener("storage", onStorage);
  window.addEventListener("online", onOnline);
  window.addEventListener("pagehide", onHide);
  void syncNow();
  return () => {
    unsubscribe();
    window.clearTimeout(timer);
    window.clearInterval(interval);
    document.removeEventListener("visibilitychange", onVisible);
    window.removeEventListener(SESSION_EVENT, onSession);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("online", onOnline);
    window.removeEventListener("pagehide", onHide);
  };
}

let mounts = 0;
let uninstall: (() => void) | null = null;
/** Starts background sync for this tab; safe to call from several components. */
export function startAutoSync(): () => void {
  mounts++;
  uninstall ??= install();
  return () => {
    if (--mounts === 0) {
      uninstall?.();
      uninstall = null;
    }
  };
}
