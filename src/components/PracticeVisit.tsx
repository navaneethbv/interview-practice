"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isPracticeVisit, parsePracticeVisits, practiceHref, RESUME_KEY, type PracticeKind } from "@/lib/practice-resume";
import { safeGet, safeSet } from "@/lib/storage";

type Props = Readonly<{
  kind: PracticeKind;
  title: string;
  context?: string;
  href?: string;
}>;

/** Records an opened detail page without marking it solved or read. */
export function PracticeVisit(props: Props) {
  return <Suspense fallback={null}><RecordVisit {...props} /></Suspense>;
}

function RecordVisit({ kind, title, context = "Coding practice", href }: Props) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const destination = href ?? practiceHref(pathname, search);
  useEffect(() => {
    const visit = {
      kind, title, context,
      href: destination,
      at: Date.now(),
    };
    if (!isPracticeVisit(visit)) return;
    safeSet(RESUME_KEY, JSON.stringify({ ...parsePracticeVisits(safeGet(RESUME_KEY)), [kind]: visit }));
    window.dispatchEvent(new StorageEvent("storage", { key: RESUME_KEY }));
  }, [kind, title, context, destination]);
  return null;
}
