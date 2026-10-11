import { Sandbox } from "@vercel/sandbox";
import { CPP_COMPILE_ARGS, runCppLocally, runGoLocally, runJavaLocally, type CompiledRunResult } from "@/lib/judge/local-java";

export const maxDuration = 60;

const MAX_SOURCE_BYTES = 512 * 1024;
const RUN_TIMEOUT_SECONDS = 10;
const MAX_OUTPUT = 2_000_000;
const DIR = "/vercel/sandbox";

type ServerLang = "java" | "cpp" | "go";
type Files = Record<string, string>;

interface Plan {
  files: Files;
  compile: { cmd: string; args: string[] };
  run: string[];
}

/** Source files, compile command and run command for each language. */
function planFor(lang: ServerLang, body: Record<string, unknown>): Plan | string {
  if (lang === "java") {
    if (typeof body.source !== "string" || !body.source.includes("public class Main")) return "Missing Java source.";
    return {
      files: { "Main.java": body.source },
      compile: { cmd: "javac", args: ["-encoding", "UTF-8", "-nowarn", "-J-XX:TieredStopAtLevel=1", "Main.java"] },
      run: ["java", "-Xss64m", "-Xmx512m", "-XX:+UseSerialGC", "-cp", ".", "Main"],
    };
  }
  if (lang === "cpp") {
    if (typeof body.source !== "string" || !body.source.includes("judgeMain")) return "Missing C++ source.";
    return { files: { "main.cpp": body.source }, compile: { cmd: "g++", args: CPP_COMPILE_ARGS }, run: ["./main"] };
  }
  if (typeof body.harness !== "string" || typeof body.solution !== "string" || !body.harness.includes("judgeRunCase")) {
    return "Missing Go source.";
  }
  return {
    files: { "go.mod": "module judge\n\ngo 1.22\n", "judge.go": body.harness, "solution.go": body.solution },
    compile: { cmd: "go", args: ["build", "-o", "main", "."] },
    run: ["./main"],
  };
}

function isServerLang(lang: string): lang is ServerLang {
  return lang === "java" || lang === "cpp" || lang === "go";
}

/** Java keeps its original snapshot variable; one snapshot with every toolchain serves all languages. */
function snapshotFor(lang: ServerLang) {
  const shared = process.env.CODE_SANDBOX_SNAPSHOT_ID;
  return lang === "java" ? (shared ?? process.env.JAVA_SANDBOX_SNAPSHOT_ID) : shared;
}

/**
 * Compiles and runs a generated judge program.
 *
 * Production: an isolated Vercel Sandbox microVM booted from a snapshot with the JDK, g++ and Go
 * installed (CODE_SANDBOX_SNAPSHOT_ID, created by `npm run sandbox:snapshot`), with all network
 * egress blocked. Development: the local toolchains, only when no snapshot is configured.
 */
export async function POST(req: Request, ctx: { params: Promise<{ lang: string }> }) {
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return Response.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
  }
  const { lang } = await ctx.params;
  if (!isServerLang(lang)) return Response.json({ error: "Unknown language." }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Expected a JSON body." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) return Response.json({ error: "Expected a JSON body." }, { status: 400 });
  const plan = planFor(lang, body);
  if (typeof plan === "string") return Response.json({ error: plan }, { status: 400 });
  const size = Object.values(plan.files).reduce((n, s) => n + Buffer.byteLength(s), 0);
  if (size > MAX_SOURCE_BYTES) return Response.json({ error: "Source is too large." }, { status: 413 });

  const snapshotId = snapshotFor(lang);
  try {
    if (snapshotId) return Response.json(await runInSandbox(plan, snapshotId));
    if (process.env.NODE_ENV === "development") return Response.json(await runLocally(lang, plan));
    return Response.json(
      { error: "The code runner is not configured. Set CODE_SANDBOX_SNAPSHOT_ID (see README)." },
      { status: 503 },
    );
  } catch (e) {
    console.error(`${lang} run failed`, e);
    return Response.json({ error: `Code runner failed: ${(e as Error).message}` }, { status: 502 });
  }
}

function runLocally(lang: ServerLang, plan: Plan): Promise<CompiledRunResult> {
  const timeout = RUN_TIMEOUT_SECONDS * 1000;
  if (lang === "java") return runJavaLocally(plan.files["Main.java"], timeout);
  if (lang === "cpp") return runCppLocally(plan.files["main.cpp"], timeout);
  return runGoLocally({ harness: plan.files["judge.go"], solution: plan.files["solution.go"] }, timeout);
}

async function runInSandbox(plan: Plan, snapshotId: string): Promise<CompiledRunResult> {
  const sandbox = await Sandbox.create({
    source: { type: "snapshot", snapshotId },
    resources: { vcpus: 2 },
    timeout: 50_000,
    networkPolicy: "deny-all",
    persistent: false,
  });
  try {
    await sandbox.writeFiles(Object.entries(plan.files).map(([name, content]) => ({ path: `${DIR}/${name}`, content: Buffer.from(content) })));
    const compile = await sandbox.runCommand({ cmd: plan.compile.cmd, args: plan.compile.args, cwd: DIR });
    if (compile.exitCode !== 0) {
      const err = (await compile.stderr()) || (await compile.stdout());
      return { compileError: err.slice(0, MAX_OUTPUT), stdout: "", stderr: "", timedOut: false };
    }
    const run = await sandbox.runCommand({ cmd: "timeout", args: ["-s", "KILL", `${RUN_TIMEOUT_SECONDS}s`, ...plan.run], cwd: DIR });
    const [stdout, stderr] = await Promise.all([run.stdout(), run.stderr()]);
    return {
      stdout: stdout.slice(0, MAX_OUTPUT),
      stderr: stderr.slice(0, 20_000),
      // `timeout -s KILL` makes the process exit with 137 when the time limit is hit.
      timedOut: run.exitCode === 137 || run.exitCode === 124,
    };
  } finally {
    await sandbox.stop().catch(() => {});
  }
}
