import type { CodeLang } from "../content-types";
import type { DesignSpec, FunctionSpec, OutputSpec, Param, ProblemSpec, ValueType } from "./types";

/**
 * Languages beyond Python and Java support the core value types that cover almost every
 * spec. Problems that need the rarer helper classes (graph nodes, interactive environments,
 * codecs) stay Python and Java only.
 */
export type ExtraLang = "javascript" | "typescript" | "cpp" | "go";
export const EXTRA_LANGS: ExtraLang[] = ["javascript", "typescript", "cpp", "go"];

export const LANG_LABEL: Record<CodeLang, string> = {
  python: "Python3",
  java: "Java",
  javascript: "JavaScript",
  typescript: "TypeScript",
  cpp: "C++",
  go: "Go",
  sql: "SQLite",
};

/** Monaco language ids. */
export const MONACO_LANG: Record<CodeLang, string> = {
  python: "python",
  java: "java",
  javascript: "javascript",
  typescript: "typescript",
  cpp: "cpp",
  go: "go",
  sql: "sql",
};

/** Languages compiled and run on the server rather than in the browser. */
export const SERVER_LANGS = new Set<CodeLang>(["java", "cpp", "go"]);

export const CORE_TYPES = new Set<ValueType>([
  "int", "long", "double", "boolean", "string", "char",
  "int[]", "long[]", "double[]", "char[]", "string[]", "boolean[]", "int[][]", "char[][]",
  "List<int>", "List<double>", "List<boolean>", "List<string>", "List<List<int>>", "List<List<string>>", "List<int[]>",
  "ListNode", "ListNode[]", "TreeNode", "List<TreeNode>", "Interval", "Interval[]", "List<Interval>", "void",
]);

function coreParam(p: Param) {
  return CORE_TYPES.has(p.type) && p.fromTree === undefined && p.fromList === undefined;
}

function coreOutput(output: OutputSpec | undefined) {
  if (!output) return true;
  if (output.root) return false;
  return output.as === undefined || output.as === "value" || output.as === "unsigned32";
}

function coreFunction(spec: FunctionSpec) {
  if (spec.environment || spec.roundTrip || spec.returnTree !== undefined) return false;
  return spec.params.every(coreParam) && CORE_TYPES.has(spec.returns) && coreOutput(spec.output);
}

function coreDesign(spec: DesignSpec) {
  if (spec.environment) return false;
  return (
    spec.ctorParams.every(coreParam) &&
    spec.methods.every((m) => m.params.every(coreParam) && CORE_TYPES.has(m.returns) && coreOutput(m.output))
  );
}

/** Whether a spec only uses features the extra-language harnesses implement. */
export function usesCoreFeatures(spec: ProblemSpec) {
  if (spec.kind === "sql") return false;
  return spec.kind === "design" ? coreDesign(spec) : coreFunction(spec);
}

/** Every language a problem can be solved in, in the order shown in the picker. */
export function languagesFor(spec: ProblemSpec | null): CodeLang[] {
  if (spec?.kind === "sql") return ["sql"];
  if (!spec) return ["python", "java"];
  return usesCoreFeatures(spec) ? ["python", "java", ...EXTRA_LANGS] : ["python", "java"];
}

/** Go exports methods by capitalizing them; LeetCode's Go stubs follow that convention. */
export function goMethodName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** JSON array of test inputs, base64-encoded so it embeds safely in any source language. */
export function encodeInputs(inputs: unknown[]) {
  const bytes = new TextEncoder().encode(JSON.stringify(inputs));
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCodePoint(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

/** Whether a language is compiled and run on the server rather than in the browser. */
export function isServerLang(lang: CodeLang) {
  return SERVER_LANGS.has(lang);
}

const RESERVED: Record<ExtraLang, Set<string>> = {
  javascript: new Set(("break case catch class const continue debugger default delete do else enum export extends false finally for "
    + "function if import in instanceof new null return super switch this throw true try typeof var void while with yield let "
    + "static implements interface package private protected public await arguments eval").split(" ")),
  typescript: new Set(),
  cpp: new Set(("alignas alignof and and_eq asm auto bitand bitor bool break case catch char class compl const constexpr "
    + "const_cast continue decltype default delete do double dynamic_cast else enum explicit export extern false float for friend "
    + "goto if inline int long mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public "
    + "register reinterpret_cast return short signed sizeof static static_assert static_cast struct switch template this "
    + "thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq").split(" ")),
  go: new Set(("break case chan const continue default defer else fallthrough for func go goto if import interface map "
    + "package range return select struct switch type var").split(" ")),
};
RESERVED.typescript = RESERVED.javascript;

/** A function, method or parameter name that is valid in the language (keywords get a trailing underscore). */
export function safeName(name: string, lang: ExtraLang) {
  return RESERVED[lang].has(name) ? `${name}_` : name;
}
