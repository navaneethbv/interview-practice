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

# Investigate a latency incident

## Scenario

A fictional service's p95 request latency increases from 200 milliseconds to two seconds after a release.
Error rate remains low, CPU is moderate, and database connection-pool waiting time rises.
Your task is to propose the next investigation and a reversible mitigation, not to guess the final root cause.
Reviewed October 4, 2026.

## Follow the request path

```text
Incoming request -> application queue -> connection-pool wait
                 -> database execution -> serialization -> response
```

Break total latency into stages before optimizing one component.
Low CPU does not rule out saturation of a smaller shared resource such as the connection pool.
Compare affected endpoints, release cohorts, traffic volume, query duration, active connections, and time spent waiting for a connection.
Check whether the application holds a connection while performing unrelated remote work.

## Hypothesis and discriminating evidence

A release may have lengthened transactions, leaked connections, or increased query count per request.
These hypotheses imply different evidence.
Long transaction duration supports the first; a steadily growing borrowed-connection count after traffic subsides supports the second; query count per request supports the third.
One correlated metric is a starting point, not proof.

## Mitigate and verify

If the previous version is known to handle the current workload and rollback is compatible with data changes, reverting the release may reduce impact while investigation continues.
Reducing concurrency or shedding lower-priority work may help when the database is overloaded.
Increasing the pool without checking database capacity can move the queue downstream and worsen the incident.

After mitigation, inspect latency distributions, queue age, request volume, and errors together.
A lower latency caused by dropping most requests is not an unqualified recovery.
Record the affected period, evidence, decision, and remaining uncertainty for the handoff.

## Interview follow-up

What changes if only one customer is affected?
Consider a hot tenant, unusually expensive queries, skewed data, or a tenant-specific dependency.
Propose a safe way to compare affected and unaffected requests without logging sensitive payloads.
A strong answer narrows the fault domain and chooses measurements that separate competing explanations.

# Turn an availability objective into an alert

## Define a useful objective

Suppose a fictional service targets 99.9 percent successful eligible requests over a rolling 30-day window.
Define eligibility and success precisely before calculating anything.
For a request-based objective, a period containing one million eligible requests permits one thousand unsuccessful requests at that target.
This is a request budget, not automatically a downtime allowance.

## Burn-rate example

The allowed error fraction is 0.001.
If the observed error fraction is 0.01 over an alert window, the burn rate is 10 because `0.01 / 0.001 = 10`.
At a stable eligible-request rate and stable error fraction, that pace would consume a full 30-day allowance in roughly three days.
Changing traffic rates or existing budget consumption changes the interpretation.
State those assumptions when doing interview arithmetic.

## Design the response

Use a short window to detect an urgent change and a longer window to check persistence.
Choose thresholds based on how much budget can be lost before a human or automated mitigation can respond.
Do not copy a threshold from another service without comparing its traffic and response needs.
At low volume, one failure can dominate a fraction, so combine the objective with suitable minimum evidence or other availability signals.

## Exercise

A deployment causes errors for five minutes, then recovers.
Explain why a short-window alert may fire while a long-window alert does not.
Now consider a smaller error rate lasting for hours and explain how it can consume more total budget.
Propose different response urgency for a fast large failure and a slow persistent degradation.

## Runbook and review

Every paging alert should identify the affected objective, show the relevant evidence, and suggest a safe first investigation.
After an incident, review whether the alert was timely and actionable.
Separate symptoms visible to users from internal metrics that help diagnosis.
A busy processor matters operationally, but it is not the same as an unavailable service.

## Source

[Google's SRE workbook on alerting](https://sre.google/workbook/alerting-on-slos/) develops error-budget and multiwindow burn-rate alerting.
The numbers and exercises here are illustrative, not production recommendations.
