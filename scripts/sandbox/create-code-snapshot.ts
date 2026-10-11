/**
 * Creates a Vercel Sandbox snapshot with a JDK, g++ and Go installed, used by /api/run/[lang].
 *
 * Needs Sandbox credentials: run `vercel link` and `vercel env pull .env.local` first
 * (provides VERCEL_OIDC_TOKEN), then:
 *   npm run sandbox:snapshot
 * and set the printed id as CODE_SANDBOX_SNAPSHOT_ID in the Vercel project.
 */
import { Sandbox } from "@vercel/sandbox";
import { buildGoProgram } from "../../src/lib/judge/go";
import type { FunctionSpec } from "../../src/lib/judge/types";

const PACKAGES = ["openjdk-21-jdk-headless", "g++", "golang-go"];

async function run(sandbox: Sandbox, cmd: string, args: string[], sudo = false, cwd?: string) {
  const result = await sandbox.runCommand({ cmd, args, sudo, cwd });
  const output = ((await result.stdout()) + (await result.stderr())).trim();
  if (result.exitCode !== 0) throw new Error(`${cmd} ${args.join(" ")} failed: ${output}`);
  return output;
}

async function main() {
  console.log("Booting sandbox...");
  const sandbox = await Sandbox.create({
    image: "vercel/sandbox/ubuntu",
    timeout: 20 * 60_000,
    resources: { vcpus: 4 },
    persistent: false,
  });
  try {
    console.log(`Installing ${PACKAGES.join(", ")}...`);
    await run(sandbox, "bash", ["-c", `apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq ${PACKAGES.join(" ")}`], true);
    console.log(await run(sandbox, "javac", ["-version"]));
    console.log((await run(sandbox, "g++", ["--version"])).split("\n")[0]);
    console.log(await run(sandbox, "go", ["version"]));

    // Build a judge program once so the Go standard library is already in the build cache.
    const spec: FunctionSpec = {
      id: "warmup", function: { python: "f", java: "f" }, params: [{ name: "x", type: "int" }], returns: "int", tests: [],
    };
    const program = buildGoProgram(spec, "func f(x int) int { return x }", [{ input: [1] }]);
    const dir = "/vercel/sandbox/warmup";
    await run(sandbox, "mkdir", ["-p", dir]);
    await sandbox.writeFiles([
      { path: `${dir}/go.mod`, content: Buffer.from("module judge\n\ngo 1.22\n") },
      { path: `${dir}/judge.go`, content: Buffer.from(program.harness) },
      { path: `${dir}/solution.go`, content: Buffer.from(program.solution) },
    ]);
    await run(sandbox, "go", ["build", "-o", "main", "."], false, dir);
    await run(sandbox, "rm", ["-rf", dir]);

    // The snapshot stops the sandbox; do not call stop() afterwards.
    const snap = await sandbox.snapshot({ expiration: 0 });
    console.log(`\nCODE_SANDBOX_SNAPSHOT_ID=${snap.snapshotId}`);
  } catch (e) {
    await sandbox.stop().catch(() => {});
    throw e;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
