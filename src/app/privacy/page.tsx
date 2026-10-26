import type { Metadata } from "next";
import Link from "next/link";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Privacy" };

const REPO = "https://github.com/navaneethbv/interview-practice";
const link = "text-brand underline underline-offset-2";

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <PageHeader eyebrow="About" title="Privacy">
        What this site stores, where, and how to remove it.
      </PageHeader>
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8 leading-relaxed text-fg-2 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-fg-1 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        <section>
          <h2>Without an account</h2>
          <p>
            Progress, code drafts, submissions, notes and preferences are saved only in your browser&apos;s storage.
            They are not sent anywhere unless you sign in or export a backup yourself.
          </p>
        </section>
        <section>
          <h2>With an account</h2>
          <p>Signing in with GitHub, Google or an emailed link creates an account with our authentication provider, Supabase. It stores:</p>
          <ul className="mt-2">
            <li>your email address and the basic profile the sign-in provider shares (such as name and avatar), used only to identify your account;</li>
            <li>one copy of your practice data, so it can sync to your other devices.</li>
          </ul>
          <p className="mt-2">
            Each account can read and write only its own copy.
            It is protected in transit and by access rules but is not end-to-end encrypted, so keep passwords and confidential material out of notes and code.
            Your sign-in session is kept in your browser and ends when you sign out or 30 days after sign-in.
          </p>
        </section>
        <section>
          <h2>Running code</h2>
          <p>
            Python, JavaScript and TypeScript run in your browser; the Python runtime is downloaded from the jsDelivr CDN.
            Java, C++ and Go are sent to a server, run in an isolated sandbox without network access, and are not stored.
          </p>
        </section>
        <section>
          <h2>What we do not do</h2>
          <p>
            The site has no ads, analytics or tracking scripts, and your data is never sold or shared.
            The hosting provider, Vercel, keeps standard request logs.
          </p>
        </section>
        <section>
          <h2>Removing your data</h2>
          <p>
            Delete the cloud copy at any time from <Link href="/settings/sync" className={link}>Account &amp; sync</Link> under Advanced.
            When signing out, check &ldquo;Also remove my practice from this browser&rdquo; to clear this device.
            To delete the account itself, contact the maintainer through the <a href={REPO} className={link}>project repository</a>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
