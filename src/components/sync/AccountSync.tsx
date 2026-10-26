"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { forgetSyncState, syncNow, useAutoSyncStatus } from "@/lib/auto-sync";
import {
  exportPractice,
  importPractice,
  parseBackup,
  type PracticeBackup,
} from "@/lib/practice-backup";
import {
  compareSnapshots,
  oauthProviders,
  readSyncSession,
  SESSION_EVENT,
  SESSION_KEY,
  syncConfig,
  SyncAuthError,
  SyncClient,
  SyncConflictError,
  type CloudSnapshot,
  type OAuthProvider,
  type SyncConfig,
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
async function applyCloudCopy(
  client: SyncClient,
  session: SyncSession,
  review: Review,
  preserved: boolean,
) {
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
}
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
      "This deletes the saved cloud snapshot for this account and signs out this browser, so it is not uploaded again. It keeps your local data and sign-in account. Other devices that are still signed in upload their copy at their next sync.",
  },
} as const;

const primary =
  "rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed";
const PROVIDER_LABELS: Record<OAuthProvider, string> = {
  github: "Continue with GitHub",
  google: "Continue with Google",
};

function subscribeSession(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === SESSION_KEY || event.key === null) listener();
  };
  window.addEventListener(SESSION_EVENT, listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(SESSION_EVENT, listener);
    window.removeEventListener("storage", onStorage);
  };
}
/** The stored session, re-read when this or another tab signs in or out. */
function useSession(config: SyncConfig | null): SyncSession | null {
  const raw = useSyncExternalStore(
    subscribeSession,
    () => {
      if (!config) return "";
      const session = readSyncSession(config);
      return session ? JSON.stringify(session) : "";
    },
    () => "",
  );
  return raw ? (JSON.parse(raw) as SyncSession) : null;
}

function SignIn({ config }: { config: SyncConfig }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const providers = oauthProviders();
  async function run(action: (client: SyncClient) => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      await action(new SyncClient(config));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sign-in failed. Try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="mt-5 grid max-w-md gap-5">
      {providers.length > 0 && (
        <div className="grid gap-2">
          {providers.map((provider) => (
            <button
              key={provider}
              type="button"
              className={button}
              disabled={busy}
              onClick={() =>
                void run(async (client) => {
                  window.location.assign(
                    await client.oauthUrl(
                      provider,
                      `${window.location.origin}/auth/callback`,
                      "/settings/sync",
                    ),
                  );
                })
              }
            >
              {PROVIDER_LABELS[provider]}
            </button>
          ))}
          <p className="mt-2 text-center text-xs text-fg-3">or sign in by email</p>
        </div>
      )}
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          void run(async (client) => {
            await client.sendCode(email.trim(), {
              callbackUrl: `${window.location.origin}/auth/callback`,
              returnTo: "/settings/sync",
            });
            setSentTo(email.trim());
            setCode("");
            setMessage(
              "Email sent. Open its sign-in link in this browser; delivery may take a minute.",
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
        <button type="submit" className={providers.length ? button : primary} disabled={busy}>
          Email me a sign-in link
        </button>
      </form>
      {sentTo && (
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            void run(async (client) => {
              await client.verifyCode(sentTo, code.trim());
              setCode("");
            });
          }}
        >
          <label className="block text-sm font-medium" htmlFor="sync-code">
            Email to {sentTo} shows a code instead? Enter it here
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
          <button type="submit" className={primary} disabled={busy}>
            Verify and sign in
          </button>
        </form>
      )}
      <p className="text-xs text-fg-3">
        Signing in creates an account if you are new. Your email address is sent to this
        site&apos;s Supabase project.
      </p>
      <p role="status" aria-live="polite" className="text-sm text-fg-2">
        {busy ? "Working…" : message}
      </p>
    </div>
  );
}

function timeAgo(at: number, now: number) {
  const seconds = Math.max(0, Math.round((now - at) / 1000));
  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  return new Date(at).toLocaleString();
}

function SignedIn({ config, session }: { config: SyncConfig; session: SyncSession }) {
  const status = useAutoSyncStatus();
  const [busy, setBusy] = useState(false);
  const [removeLocal, setRemoveLocal] = useState(false);
  const [message, setMessage] = useState("");
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  async function signOut() {
    setBusy(true);
    try {
      // Push the latest practice before leaving, unless it is being removed anyway.
      if (!removeLocal) await syncNow().catch(() => undefined);
      await new SyncClient(config).signOut(session).catch(() => undefined);
      forgetSyncState(removeLocal);
      setMessage(
        removeLocal
          ? "Signed out and removed this account's practice from this browser."
          : "Signed out. Practice in this browser is kept.",
      );
    } finally {
      setBusy(false);
    }
  }
  const lastSynced =
    "lastSyncedAt" in status && status.lastSyncedAt
      ? `Last synced ${timeAgo(status.lastSyncedAt, now)}.`
      : "";
  return (
    <div className="mt-5 space-y-5">
      <p className="break-all text-sm">
        Signed in as <strong>{session.email}</strong>
      </p>
      <div className="rounded-xl border border-line bg-layer-2 p-4">
        <p className="font-medium">
          {status.state === "syncing" && "Syncing…"}
          {status.state === "synced" && "Progress is synced"}
          {status.state === "error" && "Sync paused"}
          {status.state === "needs-choice" && "Choose what to do with this browser's practice"}
          {(status.state === "off" || status.state === "signed-out") && "Starting sync…"}
        </p>
        <p className="mt-1 text-sm text-fg-2">
          {status.state === "error" ? `${status.message} ` : ""}
          {status.state === "needs-choice"
            ? "This browser holds practice from a different account. Keep it by adding it to this account, or replace it with this account's saved progress."
            : `Progress, drafts and notes save to your account automatically and appear on any device you sign in on. ${lastSynced}`}
        </p>
        {status.state === "needs-choice" ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={button} onClick={() => void syncNow("merge")}>
              Add it to this account
            </button>
            <button
              type="button"
              className={button}
              onClick={() => {
                try {
                  const local = localBackup();
                  if (local) preserve(local, "practice-before-account-switch");
                } catch {
                  /* Damaged data cannot be exported; the replace still proceeds on request. */
                }
                void syncNow("replace");
              }}
            >
              Download it, then use this account&apos;s progress
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={`${button} mt-3`}
            disabled={status.state === "syncing"}
            onClick={() => void syncNow()}
          >
            Sync now
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <button type="button" className={button} disabled={busy} onClick={() => void signOut()}>
          Sign out
        </button>
        <label className="flex items-center gap-2 text-sm text-fg-2">
          <input
            type="checkbox"
            checked={removeLocal}
            onChange={(event) => setRemoveLocal(event.target.checked)}
            disabled={busy}
          />
          Also remove my practice from this browser (shared devices)
        </label>
      </div>
      <p role="status" aria-live="polite" className="text-sm text-fg-2">
        {message}
      </p>
    </div>
  );
}

export function AccountSync() {
  const [setup] = useState(() => {
    try {
      return { config: syncConfig(), error: "" };
    } catch (error) {
      return { config: null, error: (error as Error).message };
    }
  });
  const config = setup.config;
  const session = useSession(config);
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-line bg-layer-1 p-5 sm:p-7">
        <h2 className="text-xl font-semibold">{session ? "Your account" : "Sign in"}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-fg-2">
          Practice works without an account and always stays in this browser. Sign in to
          save your progress to your account and pick it up on any device.
        </p>
        {!config && (
          <div className="mt-5 rounded-xl border border-line bg-layer-2 p-4">
            <p className="font-medium">Accounts are not configured</p>
            <p className="mt-1 text-sm text-fg-2">
              {setup.error ||
                "This deployment has no Supabase connection. All practice and JSON backups continue to work in this browser. The deployment owner can enable accounts using docs/ACCOUNT_SYNC.md."}
            </p>
          </div>
        )}
        {config && !session && <SignIn config={config} />}
        {config && session && <SignedIn config={config} session={session} />}
      </section>
      {config && session && (
        <details className="rounded-2xl border border-line bg-layer-1 p-5 sm:p-7">
          <summary className="cursor-pointer font-semibold">
            Advanced: compare and transfer snapshots manually
          </summary>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-fg-2">
            Automatic sync merges both copies. Use these tools to inspect the copies or to
            replace one with the other after downloading a recovery file.
          </p>
          <ManualSync config={config} session={session} />
        </details>
      )}
    </div>
  );
}

/** The original reviewed snapshot transfer, kept for explicit recovery. */
function ManualSync({ config, session }: { config: SyncConfig; session: SyncSession }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState<Review | null>(null);
  const [confirm, setConfirm] = useState<
    "upload" | "download" | "delete" | null
  >(null);
  const [preserved, setPreserved] = useState(false);
  async function run(
    action: (client: SyncClient, session: SyncSession) => Promise<void>,
  ) {
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      const client = new SyncClient(config);
      await action(client, await client.fresh(session));
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Cloud sync failed. Local data is safe.",
      );
      if (error instanceof SyncAuthError) setReview(null);
      if (error instanceof SyncConflictError) setReview(null);
      setConfirm(null);
    } finally {
      setBusy(false);
    }
  }
  async function execute(client: SyncClient, session: SyncSession) {
    if (!review || !confirm) return;
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
      await applyCloudCopy(client, session, review, preserved);
      setReview(null);
      setMessage(
        "Applied the reviewed cloud data. Keys present in the backup replace matching local keys; other local data stays.",
      );
    } else {
      if (!review.cloud)
        throw new Error("There is no cloud snapshot to delete.");
      await client.delete(session, review.cloud.revision);
      // Signed in, automatic sync would upload this browser's copy straight back.
      forgetSyncState(false);
      await client.signOut(session).catch(() => undefined);
      return;
    }
    setConfirm(null);
    setPreserved(false);
  }
  const counts = review
    ? compareSnapshots(review.local, review.cloud?.backup ?? null)
    : null;
  return (
    <div className="mt-4 space-y-5">
            <button
              type="button"
              className={button}
              disabled={busy}
              onClick={() =>
                void run(async (client, session) => {
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
      <p role="status" aria-live="polite" className="text-sm text-fg-2">
        {busy ? "Working…" : message}
      </p>
    </div>
  );
}
