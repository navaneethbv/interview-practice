/**
 * Creates a Vercel Sandbox snapshot with a JDK installed, used by /api/run/java.
 *
 * Needs Sandbox credentials: run `vercel link` and `vercel env pull .env.local` first
 * (provides VERCEL_OIDC_TOKEN), then:
 *   npm run sandbox:snapshot
 * and set the printed id as JAVA_SANDBOX_SNAPSHOT_ID in the Vercel project.
 */
import { Sandbox } from "@vercel/sandbox";

async function main() {
  console.log("Booting sandbox...");
  const sandbox = await Sandbox.create({
    image: "vercel/sandbox/ubuntu",
    timeout: 15 * 60_000,
    resources: { vcpus: 4 },
    persistent: false,
  });
  try {
    console.log("Installing OpenJDK...");
    const install = await sandbox.runCommand({
      cmd: "bash",
      args: ["-c", "apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq openjdk-21-jdk-headless"],
      sudo: true,
    });
    if (install.exitCode !== 0) throw new Error(await install.stderr());
    const version = await sandbox.runCommand("javac", ["-version"]);
    console.log(((await version.stdout()) || (await version.stderr())).trim());

    // The snapshot stops the sandbox; do not call stop() afterwards.
    const snap = await sandbox.snapshot({ expiration: 0 });
    console.log(`\nJAVA_SANDBOX_SNAPSHOT_ID=${snap.snapshotId}`);
  } catch (e) {
    await sandbox.stop().catch(() => {});
    throw e;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
