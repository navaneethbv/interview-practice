import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export interface ProcessResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
}

const MAX_OUTPUT = 2_000_000;

function run(cmd: string, args: string[], cwd: string, timeoutMs: number): Promise<ProcessResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);
    child.stdout.on("data", (d: Buffer) => {
      if (stdout.length < MAX_OUTPUT) stdout += d.toString("utf8");
    });
    child.stderr.on("data", (d: Buffer) => {
      if (stderr.length < MAX_OUTPUT) stderr += d.toString("utf8");
    });
    child.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.on("close", (exitCode) => {
      clearTimeout(timer);
      resolve({ stdout, stderr, exitCode, timedOut });
    });
  });
}

export interface JavaRunResult {
  compileError?: string;
  stdout: string;
  stderr: string;
  timedOut: boolean;
}

/**
 * Compiles and runs Main.java with the local JDK. Only for development and scripts:
 * it runs code directly on this machine without isolation.
 */
export async function runJavaLocally(source: string, timeoutMs = 10_000): Promise<JavaRunResult> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "judge-java-"));
  try {
    await fs.writeFile(path.join(dir, "Main.java"), source);
    const compile = await run("javac", ["-encoding", "UTF-8", "-nowarn", "Main.java"], dir, 30_000);
    if (compile.exitCode !== 0) {
      return { compileError: compile.stderr || compile.stdout, stdout: "", stderr: "", timedOut: compile.timedOut };
    }
    const exec = await run("java", ["-Xss64m", "-Xmx512m", "-XX:+UseSerialGC", "-cp", dir, "Main"], dir, timeoutMs);
    return { stdout: exec.stdout, stderr: exec.stderr, timedOut: exec.timedOut };
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
}

/** Runs a Python script with the local interpreter (scripts only). */
export async function runPythonLocally(script: string, timeoutMs = 20_000): Promise<ProcessResult> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "judge-py-"));
  try {
    await fs.writeFile(path.join(dir, "main.py"), script);
    return await run("python3", ["main.py"], dir, timeoutMs);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
}
