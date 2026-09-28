Performance analysis starts with a hypothesis about the bottleneck.
CPU saturation, memory pressure, disk wait, network delay, lock contention, and downstream latency require different remedies.

## Measure the path

Correlate application latency with host metrics and dependency timing.
Use logs for events, metrics for trends and alerts, and traces for following one request across boundaries.
Capture enough context to reproduce a failure without logging secrets or entire payloads.

## Capacity is a feedback loop

Track utilization, queue age, error rate, and saturation before a system reaches its limit.
Load tests should resemble the production workload and should have a cleanup plan for generated data.
