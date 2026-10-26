# Accounts and progress sync

Practice works without an account and always lives in browser storage first.
When a Supabase project is configured, people can sign in at `/settings/sync` (or the navbar **Sign in** link) with GitHub, Google or an emailed sign-in link.
Signed-in practice then syncs automatically: progress, drafts, notes, submissions and preferences reach every device the person signs in on.
Without configuration the site makes no cloud requests and the account page says accounts are not configured.

## How automatic sync works

- Each account has one snapshot row in `public.practice_snapshots`, protected by row level security so a user can only read and write their own row.
- The browser syncs on sign-in, about four seconds after practice changes, when a tab becomes visible, when the browser comes back online, every minute while visible, and before the page is hidden.
  A cheap revision check skips the download when neither side changed.
- `src/lib/sync-merge.ts` merges three ways against the copy both sides last agreed on, stored as per-key fingerprints in `interview-practice:sync-base:v1`.
  A key changed on one side takes that side, including deletions.
  When both sides changed, solved, attempted and read times keep the latest, submission logs and histories are combined, and lifetime counters add both sides' increments.
  Other records, such as a code draft edited on two devices before either synced, keep the local edit.
- Uploads are compare-and-set on the row's server-generated revision.
  If another device uploaded first, the browser merges with that copy and retries.
  If practice changes during a download, the pass restarts instead of overwriting it.
- One tab syncs at a time (Web Locks), and the others pick up the result through browser storage.
- If the cloud row disappears, the next pass re-creates it from the browser instead of deleting local practice.
- When a browser holds another account's practice (the last account that synced there differs), the first sync asks whether to add it to the new account or replace it with the new account's progress, offering a download first.
  Practice made before ever signing in is added to the account on first sign-in.
- Sign-out keeps practice in the browser unless **Also remove my practice from this browser** is checked.
  Use that option on shared devices.

The **Advanced** section keeps the original manual tools: compare counts, upload the local copy, apply the cloud copy after downloading a recovery file, or delete the cloud snapshot.
Deleting the cloud snapshot also signs that browser out, because automatic sync would otherwise upload it again.

## Sessions and security

- The session (access and refresh token) is stored in `localStorage` under `interview-practice:cloud-session:v2`, outside the `ip:` prefix, so backups and snapshots never contain tokens.
  Sessions survive reloads and browser restarts and are renewed with the refresh token shortly before expiry.
  They end 30 days after sign-in regardless of refreshes, and the account page tells people to sign out on shared devices.
  For a server-enforced limit, also set a session time-box in Supabase Auth settings (a paid-plan feature).
  Any script running on the site could read them, as with the default `supabase-js` storage, so the site must keep its no-third-party-script posture.
- GitHub, Google and emailed links use the authorization-code flow with PKCE.
  The verifier is stored in `localStorage` (an emailed link opens a new tab), expires after an hour and is single use; `/auth/callback` exchanges the code and only returns to same-origin paths.
- The browser only ever holds the public anon or publishable key.
  `syncConfig` refuses `sb_secret_` and service-role keys and non-HTTPS project URLs outside local development.
- Snapshots are protected by TLS and per-user RLS, not end-to-end encryption.
  The project operator can read them, so practice notes and code should not contain credentials or confidential material.
- The snapshot limit is 20 MiB, enforced in the browser and by a database check.

## Provisioning

1. Create a Supabase project for this site, link it and apply the migration:

   ```sh
   supabase link --project-ref <ref>
   supabase db push
   ```

   The migration is `supabase/migrations/20261026000000_account_sync.sql`.
   Confirm in the dashboard that RLS is enabled with four policies on `practice_snapshots`, and check the security advisors.
2. In **Authentication > URL Configuration**, set the site URL to the production origin and add `<origin>/auth/callback` (and `http://localhost:3000/auth/callback` for development) to the redirect allow list.
3. Email: keep the Email provider enabled and anonymous sign-ins disabled.
   The app requests the email with a PKCE challenge, so the default email's link returns to `/auth/callback` and signs in, but only in the browser where sign-in was requested (the verifier is in its storage).
   Supabase's built-in mailer is limited to 2 emails per hour for the whole project and its templates cannot be edited on the free plan.
   Configure custom SMTP (for example Resend or Postmark) before relying on email sign-in; then you may also add `{{ .Token }}` to the Magic Link and Confirm Signup templates so people can type the code on another device.
4. GitHub: create an OAuth app (GitHub **Settings > Developer settings > OAuth Apps**) with the callback URL `https://<ref>.supabase.co/auth/v1/callback`, then enter its client ID and secret under **Authentication > Sign In / Providers > GitHub**.
5. Google: create an OAuth client of type **Web application** in Google Cloud (**APIs & Services > Credentials**) with the authorized redirect URI `https://<ref>.supabase.co/auth/v1/callback`, configure the consent screen, then enter the client ID and secret under the Google provider.
6. Set these deployment environment variables and redeploy (they are build-time and deliberately public):

   ```text
   NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable or anon key>
   NEXT_PUBLIC_AUTH_PROVIDERS=github,google
   ```

   List only providers enabled in step 4 or 5; email sign-in is always offered.
   Never put a secret key, service-role key, database password or SMTP credentials in `NEXT_PUBLIC_*`, and keep environment files out of git.

## Verification against a real project

Automated tests mock HTTP and storage; they do not prove a deployed database's policies.
Before inviting users, use two disposable accounts A and B:

1. Sign in as A on two browsers, make different progress offline in each, reconnect, and confirm both browsers show the union.
2. Sign in as B and confirm A's row is not visible.
   With B's access token, a REST select, PATCH or DELETE filtered on A's `user_id` must return no rows, and an INSERT with A's ID must fail.
   Anonymous requests must not read or write the table.
3. As A, an UPDATE that changes `user_id` to B's ID must be denied by the policy's `WITH CHECK`.
4. Sign out of A without removing data, sign in as B in the same browser, and confirm the add-or-replace choice appears.
5. Delete the snapshot from **Advanced**, confirm the browser signs out and keeps its practice, and that the next sign-in re-creates the row.
6. Check expired sessions refresh, a revoked refresh token signs out, an email link opened in another browser is refused, and the site still works with no configuration.

Official references: [Email OTP](https://supabase.com/docs/guides/auth/auth-email-passwordless),
[Social login](https://supabase.com/docs/guides/auth/social-login),
[PKCE flow](https://supabase.com/docs/guides/auth/sessions/pkce-flow),
[RLS](https://supabase.com/docs/guides/database/postgres/row-level-security),
[Data API security](https://supabase.com/docs/guides/api/securing-your-api).
