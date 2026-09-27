import type { FunctionSpec, DesignSpec } from "./types";

export function pythonEnvironment(spec: FunctionSpec | DesignSpec): string {
  if (!spec.environment || spec.environment.kind === "parentTree") return "";
  return `
__environment = None
__read_position = 0
def isBadVersion(version):
    return version >= __environment
def guess(number):
    return 0 if number == __environment else (-1 if number > __environment else 1)
def knows(a, b):
    return bool(__environment[a][b])
def read4(buf4):
    global __read_position
    chunk = __environment[__read_position:__read_position + 4]
    for i, char in enumerate(chunk): buf4[i] = char
    __read_position += len(chunk)
    return len(chunk)
`;
}

/** Java base class and API method for each environment kind. */
const JAVA_ENVIRONMENTS = {
  badVersion: {
    base: "VersionControl",
    method: "boolean isBadVersion(int version) { return version >= J.toInt(JudgeEnvironment.value); }",
  },
  guess: {
    base: "GuessGame",
    method: "int guess(int number) { return Integer.compare(J.toInt(JudgeEnvironment.value), number); }",
  },
  celebrity: {
    base: "Relation",
    method: "boolean knows(int a, int b) { return J.toInt(J.L(J.L(JudgeEnvironment.value).get(a)).get(b)) != 0; }",
  },
  read4: {
    base: "Reader4",
    method: `int read4(char[] buf4) {
            String file = (String) JudgeEnvironment.value; int count = 0;
            while (count < 4 && JudgeEnvironment.position < file.length()) buf4[count++] = file.charAt(JudgeEnvironment.position++);
            return count;
          }`,
  },
};

export function javaEnvironment(spec: FunctionSpec | DesignSpec): string {
  const kind = spec.environment?.kind;
  if (!kind || kind === "parentTree") return "";
  const { base, method } = JAVA_ENVIRONMENTS[kind];
  return `final class JudgeEnvironment { static Object value; static int position; }
class ${base} { ${method} }`;
}

export function environmentBase(spec: FunctionSpec | DesignSpec): string {
  switch (spec.environment?.kind) {
    case "badVersion": return " extends VersionControl";
    case "guess": return " extends GuessGame";
    case "celebrity": return " extends Relation";
    case "read4": return " extends Reader4";
    default: return "";
  }
}
