import Link from "next/link";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
export function LearningShell({
  title,
  description,
  children,
}: Readonly<{
  title: string;
  description: string;
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <PageHeader eyebrow="Your practice" title={title}>
        {description}
      </PageHeader>
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <nav
          aria-label="Learning tools"
          className="flex flex-wrap gap-3 text-sm text-brand"
        >
          <Link href="/practice/today">Today&apos;s plan</Link>
          <Link href="/practice/notebook">Saved & mistakes</Link>
          <Link href="/practice/readiness">Readiness</Link>
          <Link href="/practice">Mock interviews & review</Link>
        </nav>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
