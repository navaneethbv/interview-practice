import { getSet, lcAuthored, listSets } from "@/lib/content";

/** The list's solvable problems in order, used by the workspace for previous/next links. */
export const dynamicParams = false;

export function generateStaticParams() {
  return listSets().map((s) => ({ setId: s.id }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ setId: string }> }) {
  const set = getSet((await params).setId);
  if (!set) return Response.json({ error: "Unknown list" }, { status: 404 });
  const authored = lcAuthored();
  return Response.json({
    title: set.title,
    slugs: set.items.map((it) => it.slug).filter((slug) => authored.has(slug)),
  });
}
