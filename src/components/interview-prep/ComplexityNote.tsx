import type { Complexity } from "@/lib/technical-prep";
export function ComplexityNote({ value }: Readonly<{ value: Complexity }>) {
  return (
    <aside
      aria-label="Big O analysis"
      className="my-4 rounded-xl border border-line bg-layer-2 p-4 text-sm"
    >
      <h3 className="font-semibold text-fg-1">Big O & cost model</h3>
      <dl className="mt-2 grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-fg-3">Time / operation cost</dt>
          <dd className="mt-1 break-words font-mono text-brand">
            {value.time}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-fg-3">Space</dt>
          <dd className="mt-1 break-words font-mono text-fg-1">
            {value.space}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-fg-2">{value.notes}</p>
    </aside>
  );
}
