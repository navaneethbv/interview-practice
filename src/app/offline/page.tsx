import type { Metadata } from "next";
import { OfflineLibrary } from "@/components/OfflineLibrary";
import { NavBar, SiteFooter } from "@/components/NavBar";
export const metadata: Metadata = { title: "Offline lessons" };
export default function OfflinePage() {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-4 text-3xl font-semibold">Offline lessons</h1>
        <OfflineLibrary />
      </main>
      <SiteFooter />
    </>
  );
}
