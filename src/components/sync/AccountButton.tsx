"use client";

import Link from "next/link";
import { CloudCheck, CloudOff, LogIn, RefreshCw } from "lucide-react";
import { useAutoSyncStatus } from "@/lib/auto-sync";

const LABELS = {
  syncing: "Syncing",
  synced: "Synced",
  "needs-choice": "Sync needs your choice",
  error: "Sync problem",
} as const;

/** Navbar entry point: sign in, or the signed-in account's sync state. */
export function AccountButton() {
  const status = useAutoSyncStatus();
  if (status.state === "off") return null;
  const base =
    "grid h-9 shrink-0 place-items-center rounded-lg text-fg-2 transition hover:bg-layer-2 hover:text-fg-1";
  if (status.state === "signed-out")
    return (
      <Link href="/settings/sync" className={`${base} px-2.5`}>
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <LogIn size={16} aria-hidden />
          <span className="sr-only sm:not-sr-only">Sign in</span>
        </span>
      </Link>
    );
  const Icon =
    status.state === "syncing" ? RefreshCw : status.state === "synced" ? CloudCheck : CloudOff;
  const label = `${LABELS[status.state]} as ${status.email}`;
  return (
    <Link href="/settings/sync" aria-label={label} title={label} className={`${base} w-9`}>
      <Icon
        size={17}
        aria-hidden
        className={
          status.state === "syncing"
            ? "animate-spin motion-reduce:animate-none"
            : status.state === "synced"
              ? "text-ok"
              : "text-bad"
        }
      />
    </Link>
  );
}
