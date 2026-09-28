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
