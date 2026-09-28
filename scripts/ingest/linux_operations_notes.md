# The command line as a system interface

These notes are an independently written study aid inspired by Linux Pocket Guide and UNIX and Linux System Administration Handbook.
They focus on safe operational reasoning rather than reproducing either reference.

## Build a mental model

The shell reads a command line, expands it, connects inputs and outputs, and starts processes.
Most commands follow the Unix convention of reading standard input and writing standard output, while diagnostics go to standard error.
That convention makes small tools composable.

## Inspect before changing

Use `pwd`, `ls`, `find`, `file`, and `stat` to establish where you are and what an object is before modifying it.
Prefer explicit paths for automation and quote paths that may contain spaces or shell metacharacters.
Treat output from a command as data to inspect, not as permission to run a second command blindly.

# Files, permissions, and users

The filesystem is a namespace of files, directories, links, devices, and sockets with ownership and access controls.
Permissions are evaluated for the effective user and group, so a command that works interactively may fail under a service account.

## Access decisions

Check ownership with `ls -l` or `stat` and check the parent directories as well as the target file.
The execute bit on a directory controls traversal, which is why a readable file can still be inaccessible.
Use the narrowest account, group, and permission set that supports the task.

## Administrative boundaries

Privilege escalation should be short-lived and explainable.
Avoid making a file world-writable to fix a permissions error.
Record which identity owns generated files and which service needs to read or write them.

# Processes and service lifecycles

A process has an identity, parent, environment, file descriptors, resource limits, and a lifecycle.
Signals request an action, but a process may handle or ignore many signals.

## Diagnose in layers

Use `ps` or `pgrep` to find the process, `lsof` to inspect open files and sockets, and `top` or `vmstat` to observe resource pressure.
Check logs and service status before sending a terminating signal.
Prefer a graceful stop, verify that the process exited, and escalate only when necessary.

## Service managers

A service manager starts processes, tracks dependencies, restarts failures, and connects logs to the operating system.
When a service fails, inspect the unit configuration, recent journal entries, environment, permissions, ports, and dependencies in that order.
An automatic restart can hide a crash loop, so alert on repeated restarts rather than treating restart success as health.

# Pipelines and shell automation

Pipelines are powerful because each command can do one small transformation.
Use `grep`, `sed`, `awk`, `sort`, `uniq`, `cut`, and `xargs` when their behavior is clear, and use a real script when state or error handling becomes complex.

## Make scripts safe

Check exit codes, quote variables, validate inputs, and write temporary output before replacing a destination.
Use a restrictive temporary directory and clean it up on both success and failure.
Avoid parsing human-oriented output when a command offers a stable machine-readable format.

## Scheduling

Scheduled jobs need a timeout, a lock or idempotency strategy, bounded output, and a destination for failures.
Record the start time, completion time, input range, and result so an operator can tell whether a missed run caused data loss.

# Storage, filesystems, and backups

Storage failures can appear as application errors, latency spikes, corrupted files, or a full filesystem.
Monitor capacity, inode usage, I/O latency, error counters, and the health of the device or remote mount.

## Durable data

A backup is useful only if it can be restored and the restored data is complete enough for the recovery objective.
Keep copies in a separate failure domain, protect their credentials, and test restoration on a schedule.
Document retention and deletion rules so backup copies do not silently violate privacy requirements.

## Filesystem operations

Understand whether a path is local, network-mounted, temporary, or backed by a container volume before relying on its durability.
Atomic rename is useful for replacing a completed file, but it does not by itself guarantee that every layer has flushed data to durable media.

# Networking and diagnostics

Debug network failures from the application outward.
First confirm the destination and port, then name resolution, route selection, local firewall policy, remote reachability, and protocol behavior.

## Useful observations

`ss` or `netstat` shows listeners and connections, `dig` or `getent` checks name resolution, and `curl` can test an HTTP path with headers and timing.
Packet captures are powerful but should be scoped by interface, host, and port to avoid collecting unnecessary sensitive data.

## Remote access

SSH keys, host verification, least-privilege accounts, and restricted forwarding reduce the blast radius of remote administration.
Avoid putting secrets in command arguments or shell history.

# Observability and performance

Performance analysis starts with a hypothesis about the bottleneck.
CPU saturation, memory pressure, disk wait, network delay, lock contention, and downstream latency require different remedies.

## Measure the path

Correlate application latency with host metrics and dependency timing.
Use logs for events, metrics for trends and alerts, and traces for following one request across boundaries.
Capture enough context to reproduce a failure without logging secrets or entire payloads.

## Capacity is a feedback loop

Track utilization, queue age, error rate, and saturation before a system reaches its limit.
Load tests should resemble the production workload and should have a cleanup plan for generated data.

# Safe operational change

Administration is a change-management discipline as much as a command skill.
Before a risky change, define the target, expected result, backup or rollback, observation window, and stop condition.

## Incident checklist

Stabilize the user impact first, preserve evidence, communicate scope, and make one controlled change at a time.
After recovery, identify the contributing conditions and improve detection, automation, or documentation.
Do not turn a one-off manual command into permanent policy without understanding why it was needed.
