"use client";

import { useEffect, useState } from "react";
import {
  exportPractice,
  importPractice,
  parseBackup,
  type PracticeBackup,
} from "@/lib/practice-backup";
import {
  clearSyncSession,
  compareSnapshots,
  readSyncSession,
  syncConfig,
  SyncAuthError,
  SyncClient,
  SyncConflictError,
  type CloudSnapshot,
  type SyncSession,
} from "@/lib/sync-client";

function localBackup(): PracticeBackup | null {
  try {
    return parseBackup(exportPractice());
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "The backup contains no practice data."
    )
      return null;
    throw error;
  }
}
function preserve(backup: PracticeBackup, name: string) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}-${new Date().toISOString().replaceAll(":", "-")}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const button =
  "rounded-lg border border-line bg-layer-2 px-4 py-2 text-sm font-medium transition hover:border-line-strong disabled:opacity-40 disabled:cursor-not-allowed";
const input =
  "w-full rounded-lg border border-line bg-layer-0 px-3 py-2 text-fg-1";
type Review = { local: PracticeBackup | null; cloud: CloudSnapshot | null };
const CONFIRMATION_COPY = {
  upload: {
    title: "Replace the cloud snapshot?",
    description:
      "The reviewed local copy will replace this account’s cloud copy. Other devices keep their local data. Download the existing cloud copy first if you want to keep it.",
  },
  download: {
    title: "Apply cloud data to this browser?",
    description:
      "Matching local records will be replaced. Local-only records stay. Download a recovery copy of your current local data first.",
  },
  delete: {
    title: "Permanently delete this cloud snapshot?",
    description:
      "This deletes the saved cloud snapshot for this account. It keeps your local data and sign-in account. Other devices can upload again.",
  },
} as const;

export function AccountSync() {
  const [setup] = useState(() => {
    try {
      return { config: syncConfig(), error: "" };
    } catch (error) {
      return { config: null, error: (error as Error).message };
    }
  });
  const [session, setSession] = useState<SyncSession | null>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState<Review | null>(null);
  const [confirm, setConfirm] = useState<
    "upload" | "download" | "delete" | null
  >(null);
  const [preserved, setPreserved] = useState(false);
  const config = setup.config;
  useEffect(() => {
    if (!config) return;
    void Promise.resolve().then(() => setSession(readSyncSession(config)));
  }, [config]);
  useEffect(() => {
    if (!session) return;
    const timer = window.setTimeout(
      () => {
        clearSyncSession();
        setSession(null);
        setReview(null);
        setConfirm(null);
        setMessage("Session expired. Sign in again; local practice is safe.");
      },
      Math.max(0, session.expiresAt - Date.now() - 5000),
    );
    return () => window.clearTimeout(timer);
  }, [session]);
  async function run(action: (client: SyncClient) => Promise<void>) {
    if (!config || busy) return;
    setBusy(true);
    setMessage("");
    try {
      await action(new SyncClient(config));
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Cloud sync failed. Local data is safe.",
      );
      if (error instanceof SyncAuthError) {
        setSession(null);
        setReview(null);
      }
      if (error instanceof SyncConflictError) setReview(null);
      setConfirm(null);
    } finally {
      setBusy(false);
    }
  }
  async function execute(client: SyncClient) {
    if (!session || !review || !confirm) return;
    if (
      JSON.stringify(localBackup()?.entries ?? {}) !==
      JSON.stringify(review.local?.entries ?? {})
    )
      throw new Error(
        "Local data changed since comparison. Compare again before continuing.",
      );
    if (confirm === "upload") {
      if (!review.local)
        throw new Error("There is no local practice data to upload.");
      const cloud = await client.upload(
        session,
        review.local,
        review.cloud?.revision ?? null,
      );
      setReview({ local: review.local, cloud });
      setMessage(
        "Uploaded the reviewed local snapshot. Local practice is unchanged.",
      );
    } else if (confirm === "download") {
      if (!review.cloud)
        throw new Error("There is no cloud snapshot to download.");
      const latest = await client.read(session);
      if (latest?.revision !== review.cloud.revision)
        throw new SyncConflictError();
      if (
        JSON.stringify(localBackup()?.entries ?? {}) !==
        JSON.stringify(review.local?.entries ?? {})
      )
        throw new Error(
          "Local data changed during download. Compare again before continuing.",
        );
      // Never discard conflicting local data without an explicit recovery download.
      if (review.local && !preserved)
        throw new Error(
          "Download your local recovery copy before applying cloud data.",
        );
      importPractice(parseBackup(JSON.stringify(review.cloud.backup)));
      setReview(null);
      setMessage(
        "Applied the reviewed cloud data. Keys present in the backup replace matching local keys; other local data stays.",
      );
    } else {
      if (!review.cloud)
        throw new Error("There is no cloud snapshot to delete.");
      await client.delete(session, review.cloud.revision);
      setReview({ local: review.local, cloud: null });
      setMessage(
        "Cloud snapshot deleted. Local practice and your account are kept.",
      );
    }
    setConfirm(null);
    setPreserved(false);
  }
  const counts = review
    ? compareSnapshots(review.local, review.cloud?.backup ?? null)
    : null;
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-line bg-layer-1 p-5 sm:p-7">
        <h2 className="text-xl font-semibold">Optional account &amp; sync</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-fg-2">
          Practice works without an account. Cloud sync is manual: compare
          copies, choose a direction, then confirm. Uploads include your drafts,
          notes and progress. No data is uploaded on sign-in.
        </p>
        {!config && (
          <div className="mt-5 rounded-xl border border-line bg-layer-2 p-4">
            <p className="font-medium">Cloud sync is not configured</p>
            <p className="mt-1 text-sm text-fg-2">
              {setup.error ||
                "This deployment has no Supabase connection. All practice and JSON backups continue to work in this browser. The deployment owner can enable sync using docs/ACCOUNT_SYNC.md."}
            </p>
          </div>
        )}
        {config && !session && (
          <div className="mt-5 grid max-w-xl gap-5">
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                void run(async (client) => {
                  await client.sendCode(email.trim());
                  setSentTo(email.trim());
                  setCode("");
                  setMessage(
                    "Code requested. Check your inbox; delivery may take a minute.",
                  );
                });
              }}
            >
              <label className="block text-sm font-medium" htmlFor="sync-email">
                Email address
              </label>
              <input
                id="sync-email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className={input}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={busy}
              />
              <p className="text-xs text-fg-3">
                Requesting a code creates an account if you are new. Your email
                is sent to this deployment&apos;s Supabase service.
              </p>
              <button type="submit" className={button} disabled={busy}>
                Send sign-in code
              </button>
            </form>
            {sentTo && (
              <form
                className="space-y-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  void run(async (client) => {
                    setSession(await client.verifyCode(sentTo, code.trim()));
                    setCode("");
                    setReview(null);
                    setMessage(
                      "Signed in. Compare your copies to start syncing.",
                    );
                  });
                }}
              >
                <label
                  className="block text-sm font-medium"
                  htmlFor="sync-code"
                >
                  Code sent to {sentTo}
                </label>
                <input
                  id="sync-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  minLength={6}
                  maxLength={10}
                  className={input}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  disabled={busy}
                />
                <button type="submit" className={button} disabled={busy}>
                  Verify code
                </button>
              </form>
            )}
          </div>
        )}
        {config && session && (
          <div className="mt-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="break-all text-sm">
                Signed in as <strong>{session.email}</strong>
              </p>
              <button
                type="button"
                className={button}
                disabled={busy}
                onClick={() =>
                  void run(async (client) => {
                    try {
                      await client.signOut(session);
                    } finally {
                      setSession(null);
                      setReview(null);
                      setConfirm(null);
                    }
                    setMessage("Signed out. Local practice is kept.");
                  })
                }
              >
                Sign out
              </button>
            </div>
            <p className="text-xs text-fg-3">
              Sign-in lasts for this browser tab until expiry. Closing the tab
              clears its stored session. Use sign-out on shared devices.
            </p>
            <button
              type="button"
              className={button}
              disabled={busy}
              onClick={() =>
                void run(async (client) => {
                  const local = localBackup();
                  const cloud = await client.read(session);
                  setReview({ local, cloud });
                  setConfirm(null);
                  setPreserved(false);
                  setMessage("Comparison ready. Choose a direction below.");
                })
              }
            >
              Compare local &amp; cloud
            </button>
            {review && counts && (
              <div className="space-y-4 rounded-xl border border-line p-4">
                <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
                  {[
                    ["Local entries", counts.local],
                    ["Cloud entries", counts.cloud],
                    ["Different", counts.changed],
                    ["Local only", counts.localOnly],
                    ["Cloud only", counts.cloudOnly],
                  ].map(([label, count]) => (
                    <div key={label}>
                      <dt className="text-fg-3">{label}</dt>
                      <dd className="mt-1 text-xl font-semibold tabular-nums">
                        {count}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="text-xs text-fg-3">
                  {review.cloud
                    ? `Cloud saved ${new Date(review.cloud.updated_at).toLocaleString()}.`
                    : "No cloud snapshot exists for this account."}{" "}
                  Counts include drafts, progress and settings records.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={button}
                    disabled={busy || !review.local}
                    onClick={() => {
                      setConfirm("upload");
                      setPreserved(false);
                    }}
                  >
                    Upload local copy
                  </button>
                  <button
                    type="button"
                    className={button}
                    disabled={busy || !review.cloud}
                    onClick={() => {
                      setConfirm("download");
                      setPreserved(false);
                    }}
                  >
                    Apply cloud copy
                  </button>
                  <button
                    type="button"
                    className={button}
                    disabled={busy || !review.cloud}
                    onClick={() => setConfirm("delete")}
                  >
                    Delete cloud data
                  </button>
                </div>
              </div>
            )}
            {confirm && review && (
              <section
                aria-labelledby="sync-confirm-heading"
                className="space-y-3 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4"
              >
                <h3 id="sync-confirm-heading" className="font-semibold">
                  {CONFIRMATION_COPY[confirm].title}
                </h3>
                <p className="text-sm text-fg-2">
                  {CONFIRMATION_COPY[confirm].description}
                </p>
                {confirm === "download" && review.local && (
                  <button
                    type="button"
                    className={button}
                    disabled={busy}
                    onClick={() => {
                      preserve(review.local!, "practice-before-cloud");
                      setPreserved(true);
                    }}
                  >
                    Download local recovery copy
                  </button>
                )}
                {confirm !== "download" && review.cloud && (
                  <button
                    type="button"
                    className={button}
                    disabled={busy}
                    onClick={() =>
                      preserve(review.cloud!.backup, "practice-cloud-recovery")
                    }
                  >
                    Download cloud recovery copy
                  </button>
                )}
                {preserved && (
                  <p className="text-xs text-fg-2">
                    Recovery download started. Keep that file before confirming.
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={button}
                    disabled={
                      busy ||
                      (confirm === "download" && !!review.local && !preserved)
                    }
                    onClick={() => void run(execute)}
                  >
                    Confirm {confirm === "download" ? "apply" : confirm}
                  </button>
                  <button
                    type="button"
                    className={button}
                    disabled={busy}
                    onClick={() => setConfirm(null)}
                  >
                    Cancel
                  </button>
                </div>
              </section>
            )}
          </div>
        )}
        <p role="status" aria-live="polite" className="mt-4 text-sm text-fg-2">
          {busy ? "Working…" : message}
        </p>
      </section>
    </div>
  );
}
