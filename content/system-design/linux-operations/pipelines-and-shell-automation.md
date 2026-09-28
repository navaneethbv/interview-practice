Pipelines are powerful because each command can do one small transformation.
Use `grep`, `sed`, `awk`, `sort`, `uniq`, `cut`, and `xargs` when their behavior is clear, and use a real script when state or error handling becomes complex.

## Make scripts safe

Check exit codes, quote variables, validate inputs, and write temporary output before replacing a destination.
Use a restrictive temporary directory and clean it up on both success and failure.
Avoid parsing human-oriented output when a command offers a stable machine-readable format.

## Scheduling

Scheduled jobs need a timeout, a lock or idempotency strategy, bounded output, and a destination for failures.
Record the start time, completion time, input range, and result so an operator can tell whether a missed run caused data loss.
