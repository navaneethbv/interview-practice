A rate limiter protects a service from accidental overload and deliberate abuse.
Clarify whether the limit applies per user, token, IP, endpoint, tenant, or global service.

## Algorithm choices

A fixed window is simple but can allow bursts at a boundary.
A sliding window gives a smoother view of recent usage but costs more state.
A token bucket allows controlled bursts while enforcing a long-term refill rate.
Choose the algorithm based on the product promise and the cost of rejecting or delaying work.

## Placement and failure

An edge limiter can reject traffic early, while a service-level limiter understands authenticated identity and business cost.
Distributed counters need a consistency decision and a degraded-mode policy when the counter store is unavailable.
Return a retry hint and make rejection observable.
