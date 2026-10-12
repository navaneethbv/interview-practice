# Circuit Breaker with a Failure Window

Implement `CircuitBreaker(threshold, window, cooldown)` and `call(timestamp, success)` for one service.

Return `true` if a call is permitted to execute, even when its supplied outcome is a failure. Return `false` for a blocked call, ignoring its supplied outcome. While closed, count failures of executed calls in `(timestamp - window, timestamp]`. The failure that reaches `threshold` still executes, then opens the circuit until `timestamp + cooldown`. All calls before that time are blocked.

At the exact reopening time or later, close the circuit and clear the previous failure history before handling the next call. A successful call does not erase failures within the current window. Calls have nondecreasing timestamps. This exercise intentionally omits the half-open state.

## Constraints

- Up to 100,000 calls; `1 <= threshold <= 100,000`.
- `1 <= window, cooldown <= 10^9`; `0 <= timestamp <= 10^9`.

## Examples

### Example 1

For `(3,10,5)`, calls `[(0,false),(1,false),(2,false),(6,true),(7,true)]` return `[true,true,true,false,true]`.

### Example 2

For `(2,10,3)`, calls `[(0,false),(5,true),(10,false),(11,false)]` all execute. The failure at 0 expires before the call at 10; the call at 11 then opens the circuit.

## Follow-up

Add a half-open probe and discuss concurrent callers.

## Source and scope

Original practice contract based on the public topic reported at [Hello Interview](https://www.hellointerview.com/community/questions/circuit-breaker-client/cmk5b2t4p00xh08advuhtl6x6), observed October 12, 2026. API choices and test cases are authored for this site; this is not a reproduction of the source question or a claim that every follow-up is covered.
