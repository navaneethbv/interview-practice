"use client";

import { useEffect } from "react";
import { startAutoSync } from "@/lib/auto-sync";

/** Keeps signed-in practice synced with the account in the background. */
export function AutoSyncProvider() {
  useEffect(() => startAutoSync(), []);
  return null;
}
