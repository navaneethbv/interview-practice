import { searchIndex } from "@/lib/catalog";

export const dynamic = "force-static";

/** Static index for the command palette, fetched the first time it opens. */
export function GET() {
  return Response.json(searchIndex());
}
