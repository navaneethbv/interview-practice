import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Consistent page title block: optional breadcrumb trail, eyebrow, title, description and actions. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  children,
  actions,
}: Readonly<{
  crumbs?: { href: string; label: string }[];
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}>) {
  return (
    <div className="hero-glow border-b border-line">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-7 sm:pt-8">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-fg-3">
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-1">
                  <Link href={c.href} className="-my-1.5 inline-block py-1.5 hover:text-fg-1">{c.label}</Link>
                  <ChevronRight size={14} aria-hidden />
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {eyebrow && <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-brand uppercase">{eyebrow}</p>}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0 max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
            {children && <div className="mt-2 text-fg-2 sm:text-[15px] sm:leading-relaxed">{children}</div>}
          </div>
          {actions && <div className="flex min-w-0 max-w-full flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
