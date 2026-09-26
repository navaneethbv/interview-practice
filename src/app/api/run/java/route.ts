import { Sandbox } from "@vercel/sandbox";
import { runJavaLocally, type JavaRunResult } from "@/lib/judge/local-java";

export const maxDuration = 60;

const MAX_SOURCE_BYTES = 512 * 1024;
const RUN_TIMEOUT_SECONDS = 10;
const MAX_OUTPUT = 2_000_000;

/**
 * Compiles and runs a generated Main.java.
 *
 * Production: an isolated Vercel Sandbox microVM booted from a snapshot that has a JDK
 * installed (JAVA_SANDBOX_SNAPSHOT_ID, created by `npm run sandbox:snapshot`), with all
 * network egress blocked. Development: the local JDK, only when no snapshot is configured.
 */
export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return Response.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
  }

  let source: unknown;
  try {
    ({ source } = (await req.json()) as { source?: unknown });
  } catch {
    return Response.json({ error: "Expected a JSON body." }, { status: 400 });
  }
  if (typeof source !== "string" || !source.includes("public class Main")) {
    return Response.json({ error: "Missing Java source." }, { status: 400 });
  }
  if (Buffer.byteLength(source) > MAX_SOURCE_BYTES) {
    return Response.json({ error: "Source is too large." }, { status: 413 });
  }

  const snapshotId = process.env.JAVA_SANDBOX_SNAPSHOT_ID;
  try {
    if (snapshotId) return Response.json(await runInSandbox(source, snapshotId));
    if (process.env.NODE_ENV === "development") {
      return Response.json(await runJavaLocally(source, RUN_TIMEOUT_SECONDS * 1000));
    }
    return Response.json(
      { error: "The Java runner is not configured. Set JAVA_SANDBOX_SNAPSHOT_ID (see README)." },
      { status: 503 },
    );
  } catch (e) {
    console.error("Java run failed", e);
    return Response.json({ error: `Java runner failed: ${(e as Error).message}` }, { status: 502 });
  }
}

async function runInSandbox(source: string, snapshotId: string): Promise<JavaRunResult> {
  const sandbox = await Sandbox.create({
    source: { type: "snapshot", snapshotId },
    resources: { vcpus: 2 },
    timeout: 50_000,
    networkPolicy: "deny-all",
    persistent: false,
  });
  try {
    await sandbox.writeFiles([{ path: "/vercel/sandbox/Main.java", content: Buffer.from(source) }]);
    const compile = await sandbox.runCommand({
      cmd: "javac",
      args: ["-encoding", "UTF-8", "-nowarn", "-J-XX:TieredStopAtLevel=1", "Main.java"],
      cwd: "/vercel/sandbox",
    });
    if (compile.exitCode !== 0) {
      const err = (await compile.stderr()) || (await compile.stdout());
      return { compileError: err.slice(0, MAX_OUTPUT), stdout: "", stderr: "", timedOut: false };
    }
    const run = await sandbox.runCommand({
      cmd: "timeout",
      args: ["-s", "KILL", `${RUN_TIMEOUT_SECONDS}s`, "java", "-Xss64m", "-Xmx512m", "-XX:+UseSerialGC", "-cp", ".", "Main"],
      cwd: "/vercel/sandbox",
    });
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
