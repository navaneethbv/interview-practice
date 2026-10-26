import Link from "next/link";
import { Code2 } from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { PracticeDataControls } from "./PracticeDataControls";
import { ColorThemePicker, ThemeToggle } from "./ThemeProvider";
import { MobileMenu, NavLinks } from "./NavLinks";
import { AccountButton } from "./sync/AccountButton";

export function NavBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-layer-1/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-13 max-w-6xl items-center gap-3 px-4 sm:gap-5">
        <Link href="/" aria-label="Interview Practice home" className="-my-2 flex shrink-0 items-center gap-2 py-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-lg bg-brand text-neutral-950 shadow-card">
            <Code2 size={16} strokeWidth={2.5} />
          </span>
          <span className="navbar-brand-text">Interview Practice</span>
        </Link>
        <NavLinks />
        <div className="ml-auto flex items-center gap-1.5">
          <CommandPalette />
          <ThemeToggle />
          <ColorThemePicker />
          <AccountButton />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

/** Site footer for the browsing and reading pages, with the practice-data backup controls. */
export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-fg-3 md:grid-cols-[1fr_minmax(0,28rem)] md:items-start">
        <div>
          <p className="font-medium text-fg-2">Interview Practice</p>
          <p className="mt-1 max-w-md">Progress, code and notes stay in this browser. Sign in to sync them across devices, or back them up.</p>
          <nav aria-label="Site settings" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-fg-2">
            <Link href="/settings/sync" className="hover:text-fg-1">Account & sync</Link>
            <Link href="/offline" className="hover:text-fg-1">Offline library</Link>
            <Link href="/content-status" className="hover:text-fg-1">Sources & review dates</Link>
            <Link href="/privacy" className="hover:text-fg-1">Privacy</Link>
          </nav>
        </div>
        <PracticeDataControls />
      </div>
    </footer>
  );
}
