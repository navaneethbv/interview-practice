"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { syncConfig, SyncClient } from "@/lib/sync-client";

/** Finishes a GitHub or Google sign-in started on the account page. */
export function OAuthCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const started = useRef(false);
  useEffect(() => {
    // The authorization code is single use; never exchange it twice.
    if (started.current) return;
    started.current = true;
    const code = params.get("code");
    const failure = params.get("error_description") ?? params.get("error");
    void (async () => {
      try {
        if (failure) throw new Error(`Sign-in was not completed: ${failure.slice(0, 200)}`);
        const config = syncConfig();
        if (!config) throw new Error("Accounts are not configured on this deployment.");
        if (!code) throw new Error("This sign-in link is missing its code. Start sign-in again.");
        const { returnTo } = await new SyncClient(config).exchangeCode(code);
        router.replace(returnTo);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Sign-in failed. Start again.");
      }
    })();
  }, [params, router]);
  return error ? (
    <div className="rounded-2xl border border-line bg-layer-1 p-6">
      <h1 className="text-lg font-semibold">Sign-in did not finish</h1>
      <p role="alert" className="mt-2 text-sm text-fg-2">{error}</p>
      <p className="mt-4 text-sm text-fg-2">Your local practice is unchanged.</p>
      <Link href="/settings/sync" className="mt-4 inline-block text-sm font-medium text-blue hover:underline">
        Back to sign-in
      </Link>
    </div>
  ) : (
    <p role="status" className="text-center text-fg-2">Signing you in…</p>
  );
}
