import Link from "next/link";
import { Code2 } from "lucide-react";
import { ThemeToggle } from "./ThemeProvider";
import { NavLinks } from "./NavLinks";

export function NavBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-layer-1/90 backdrop-blur">
      <div className="mx-auto flex h-13 max-w-6xl items-center gap-3 px-4 sm:gap-6">
        <Link href="/" aria-label="Interview Practice home" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-brand text-white">
            <Code2 size={16} strokeWidth={2.5} />
          </span>
          <span className="hidden md:inline">Interview Practice</span>
        </Link>
        <NavLinks />
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
