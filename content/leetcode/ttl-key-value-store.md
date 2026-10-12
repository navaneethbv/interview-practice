# TTL Key-Value Store

Implement `TTLStore()` with explicit logical timestamps, measured in seconds.

- `put(key, value, ttl, timestamp)` stores or overwrites a value. It expires at `timestamp + ttl`.
- `get(key, timestamp)` returns `[value]` if the key exists and has not expired; otherwise `[]`.
- `remove(key, timestamp)` returns whether a live entry was removed.

A key is already expired at its expiration timestamp. Overwriting resets expiration. Calls have nondecreasing timestamps, and equal timestamps are allowed. Expiration is independent for each key. No wall-clock timers or threads are required. Void operations produce `null`.

## Constraints

- Up to 100,000 operations; keys are nonempty strings of at most 100 characters.
- `0 <= timestamp <= 10^9`, `1 <= ttl <= 10^9`; values are signed 32-bit integers.
- An empty result differs from storing `0` or `-1`.

## Examples

### Example 1

`put("x", 7, 5, 0)`, `get("x", 4)`, `get("x", 5)` return `[null, [7], []]`.

### Example 2

`put("a", 1, 2, 0)`, `put("a", 9, 8, 1)`, `get("a", 2)`, `get("a", 9)` return `[null, null, [9], []]`.

## Follow-up

How would you reclaim expired keys that are never read, and make operations atomic across threads?

## Source and scope

Original practice contract based on the public topic reported at [Hello Interview](https://www.hellointerview.com/community/questions/key-value-ttl/cmjxixyya02aj07adok8leqq5), observed October 12, 2026. API choices and test cases are authored for this site; this is not a reproduction of the source question or a claim that every follow-up is covered.
