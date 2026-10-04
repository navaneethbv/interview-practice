"use client";

import { useSyncExternalStore } from "react";

// Only failed writes live here. A successful write returns reads to localStorage so
// other tabs' changes remain visible. Null is a pending removal, not a missing entry.
const pending = new Map<string, string | null>();
const listeners = new Set<() => void>();
function notify() { listeners.forEach((listener) => listener()); }

export function safeGet(key: string): string | null {
  if (pending.has(key)) return pending.get(key) ?? null;
  try { return window.localStorage.getItem(key); }
  catch { return null; }
}

function write(key: string, value: string | null): boolean {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
    pending.delete(key);
    notify();
    return true;
  } catch {
    pending.set(key, value);
    notify();
    return false;
  }
}

export const safeSet = (key: string, value: string) => write(key, value);
export const safeRemove = (key: string) => write(key, null);
export const pendingWriteCount = () => pending.size;
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
export function usePendingWrites() {
  return useSyncExternalStore(subscribe, pendingWriteCount, () => 0);
}
export function retryStorage() {
  for (const [key, value] of pending) write(key, value);
  return pending.size === 0;
}

/** Includes drafts that have not reached disk. Throws rather than exporting an
 * incomplete backup when browser storage cannot be enumerated. */
export function storedEntries(): Record<string, string> {
  const entries: Record<string, string> = {};
  const storage = window.localStorage;
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key?.startsWith("ip:")) {
      const value = storage.getItem(key);
      if (value !== null) entries[key] = value;
    }
  }
  for (const [key, value] of pending) {
    if (value === null) delete entries[key];
    else entries[key] = value;
  }
  return entries;
}

function rollbackEntries(changed: string[], before: Map<string, string | null>): boolean {
  // Remove newly written data before restoring prior values to release quota.
  let rollbackFailed = false;
  for (const key of changed) {
    if (!safeRemove(key)) rollbackFailed = true;
  }
  for (const key of changed) {
    const value = before.get(key) ?? null;
    if (value !== null && !write(key, value)) rollbackFailed = true;
  }
  return rollbackFailed;
}

/** Restore only backup keys. On failure, roll back writes and retain any values
 * that cannot be restored on disk in memory for recovery. */
export function restoreEntries(entries: Record<string, string>): void {
  if (pending.size) throw new Error("Save or export your unsaved changes before importing a backup.");
  const storage = window.localStorage;
  const before = new Map(Object.keys(entries).map((key) => [key, storage.getItem(key)]));
  const changed: string[] = [];
  try {
    for (const [key, value] of Object.entries(entries)) {
      storage.setItem(key, value);
      changed.push(key);
    }
  } catch {
    const rollbackFailed = rollbackEntries(changed, before);
    throw new Error(rollbackFailed
      ? "Import failed. Some original data is held in this tab only. Export it before leaving."
      : "Import failed. Your previous data was restored. Free browser storage and try again.");
  }
  window.dispatchEvent(new StorageEvent("storage", { key: null }));
}
