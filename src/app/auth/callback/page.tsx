import type { Metadata } from "next";
import { Suspense } from "react";
import { NavBar } from "@/components/NavBar";
import { OAuthCallback } from "@/components/sync/OAuthCallback";

export const metadata: Metadata = { title: "Signing in", robots: { index: false } };
export default function CallbackPage() {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-xl px-4 py-16">
        <Suspense>
          <OAuthCallback />
        </Suspense>
      </main>
    </>
  );
}
