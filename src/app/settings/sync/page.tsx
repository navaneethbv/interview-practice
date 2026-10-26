import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { AccountSync } from "@/components/sync/AccountSync";

export const metadata: Metadata = { title: "Account & sync" };
export default function SyncPage() {
  return (
    <>
      <NavBar />
      <PageHeader eyebrow="Settings" title="Account & sync">
        Keep practice local, or move a reviewed snapshot between your devices.
      </PageHeader>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <AccountSync />
      </main>
      <SiteFooter />
    </>
  );
}
