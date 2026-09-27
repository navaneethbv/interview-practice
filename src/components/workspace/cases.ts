import type { AnyTestCase, DesignSpec, DesignTestCase, ProblemSpec, SqlSpec, SqlTestCase, TestCase } from "@/lib/judge/types";

/** A test case as shown in the Testcase panel: one JSON text field per parameter. */
export interface EditableCase {
  fields: string[];
  /** Index of the spec test this case was copied from, if any. */
  from?: number;
}

export function fieldNames(spec: ProblemSpec): string[] {
  if (spec.kind === "sql") return ["tables", "query parameters"];
  if (spec.kind === "design") {
    const base = spec.ctorParams.length ? ["constructor", "operations", "arguments"] : ["operations", "arguments"];
    return [...base, ...(spec.environment ? [spec.environment.param.name] : [])];
  }
  return [...spec.params.map((p) => p.name), ...(spec.environment ? [spec.environment.param.name] : [])];
}

export function inputFields(spec: ProblemSpec, test: AnyTestCase): string[] {
  if (spec.kind === "sql") {
    const input = (test as SqlTestCase).input;
    return [JSON.stringify(input.tables), JSON.stringify(input.params ?? {})];
  }
  if (spec.kind === "design") {
    const { ctor, ops, args, environment } = (test as DesignTestCase).input;
    const base = [JSON.stringify(ops), JSON.stringify(args), ...(spec.environment ? [JSON.stringify(environment)] : [])];
    return spec.ctorParams.length ? [JSON.stringify(ctor), ...base] : base;
  }
  return (test as TestCase).input.map((v) => JSON.stringify(v));
}

export function toEditable(spec: ProblemSpec, test: AnyTestCase, from?: number): EditableCase {
  return { fields: inputFields(spec, test), from };
}

/** Parses the text fields back into a test input, or returns a readable error. */
export function parseCase(spec: ProblemSpec, c: EditableCase): { input: AnyTestCase["input"] } | { error: string } {
  const names = fieldNames(spec);
  const values: unknown[] = [];
  for (let i = 0; i < names.length; i++) {
    try {
      values.push(JSON.parse(c.fields[i] ?? ""));
    } catch {
      return { error: `"${names[i]}" is not valid JSON.` };
    }
  }
  if (spec.kind === "sql") return parseSqlInput(spec, values);
  if (spec.kind === "design") return parseDesignInput(spec, values);
  return { input: values };
}

type ParsedCase = { input: AnyTestCase["input"] } | { error: string };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseSqlInput(spec: SqlSpec, [tables, params]: unknown[]): ParsedCase {
  if (!isPlainObject(tables) || !isPlainObject(params)) return { error: "Tables and query parameters must be JSON objects." };
  for (const table of spec.tables) {
    const rows = tables[table.name];
    if (!Array.isArray(rows) || rows.some((row) => !Array.isArray(row) || row.length !== table.columns.length)) {
      return { error: `${table.name} must contain rows with ${table.columns.length} cells.` };
    }
  }
  return { input: { tables, params } as SqlTestCase["input"] };
}

function parseDesignInput(spec: DesignSpec, values: unknown[]): ParsedCase {
  const [ctor, ops, args, environment] = spec.ctorParams.length ? values : [[], ...values];
  if (!Array.isArray(ops) || !Array.isArray(args) || ops.length !== args.length) {
    return { error: "operations and arguments must be arrays of the same length." };
  }
  if (!Array.isArray(ctor)) return { error: "constructor must be an array of arguments." };
  return { input: { ctor, ops: ops as string[], args: args as unknown[][], ...(spec.environment ? { environment } : {}) } };
}

/** True when a case is unchanged from the spec test it was copied from. */
export function isPristine(spec: ProblemSpec, c: EditableCase): boolean {
  if (c.from === undefined) return false;
  const original = inputFields(spec, spec.tests[c.from]);
  return original.every((f, i) => normalize(f) === normalize(c.fields[i] ?? ""));
}

function normalize(s: string) {
  try {
    return JSON.stringify(JSON.parse(s));
  } catch {
    return s;
  }
}

export function formatValue(v: unknown): string {
  if (v === undefined) return "";
  return JSON.stringify(v);
}
