import type { RenderedBlock } from "@/lib/content";
import { CodeTabs } from "./CodeTabs";

/** Renders ingested lesson blocks. The HTML was sanitized during ingestion. */
export function LessonContent({ blocks, className = "" }: { blocks: RenderedBlock[]; className?: string }) {
  return (
    <div className={`prose-lesson ${className}`}>
      {blocks.map((b, i) => {
        if (b.t === "html") return <div key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
        if (b.t === "img") {
          return (
            <figure
              key={i}
              className="diagram mx-auto my-5 overflow-hidden p-2"
              style={{ maxWidth: Math.min(b.w + 16, 760) }}
            >
              {/* Ingested static diagrams; next/image adds nothing for local SVGs. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} width={b.w} height={b.h} alt={b.alt ?? "Diagram"} loading="lazy" className="mx-auto" />
            </figure>
          );
        }
        return <CodeTabs key={i} java={b.javaHtml} python={b.pythonHtml} javaSrc={b.java} pythonSrc={b.python} />;
      })}
    </div>
  );
}
