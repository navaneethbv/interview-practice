# Sliding-Window Rate Limiter

Implement `SlidingWindowLimiter(limit, window)` and `allow(key, timestamp)`.

Each key has its own request history. Accept a request only when fewer than `limit` previously accepted requests for that key lie in `(timestamp - window, timestamp]`. If accepted, record the new request and return `true`; otherwise return `false`. Rejected requests do not consume quota. Calls arrive in nondecreasing timestamp order, including ties. Times are integer seconds.

## Constraints

- Up to 100,000 calls; `1 <= limit <= 100,000`, `1 <= window <= 10^9`.
- `0 <= timestamp <= 10^9`; nonempty keys have at most 100 characters.

## Examples

### Example 1

For `(limit=2, window=10)`, requests for `a` at `[0, 1, 9, 10]` return `[true, true, false, true]`. At time 10, the request at time 0 no longer counts.

### Example 2

For `(limit=1, window=5)`, requests `[(a,0), (b,0), (a,1)]` return `[true, true, false]`.

## Follow-up

Discuss memory cleanup for idle keys and coordinated limits across several service instances.

## Source and scope

Original practice contract based on the public topic reported at [Hello Interview](https://www.hellointerview.com/community/questions/sliding-window-rate-limiter/cmni1bvsy02uw0dadl09u4g1r), observed October 12, 2026. API choices and test cases are authored for this site; this is not a reproduction of the source question or a claim that every follow-up is covered.
