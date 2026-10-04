## Intuition

Timestamps arrive in nondecreasing order, so each viewer type's join times are already sorted.
Expired joins form a prefix that can be removed permanently when that type is queried.

## Brute force

Scanning every historical join for every query can take quadratic total time.
A queue makes removal of the expired prefix efficient and avoids reconsidering already-expired events.

## Approach

Maintain one deque of join timestamps per viewer type.
Join appends its timestamp to the relevant deque.
For get_viewers, remove timestamps strictly smaller than `t - window`, then return the remaining deque length.
No timestamp can exceed t because all calls are chronological.
The retained timestamps therefore lie exactly in the inclusive interval `[t - window, t]`.
Future queries cannot need a removed timestamp because their lower time boundary never moves backward.

## Walkthrough

```text
Input: ctor = [10], ops = ["join", "join", "join", "get_viewers", "get_viewers"], args = [[1, "subscriber"], [2, "follower"], [3, "follower"], [10, "follower"], [13, "follower"]]
Output: [null, null, null, 2, 1]
```

Example 1 stores follower joins at times 2 and 3 and a separate subscriber join at time 1.
At t = 10 with window 10, both follower timestamps lie in `[0, 10]`, so the query returns 2.
At t = 13, the interval becomes `[3, 13]`.
Time 2 is removed, but time 3 remains because the lower boundary is inclusive, returning 1.

## Complexity

A join takes amortized O(1) time.
A query may remove many entries, but each timestamp is removed at most once, giving O(M) total queue work across M operations.
Storage is O(M) worst case because types not queried retain old joins.

## Edge cases

A type with no joins returns zero.
Multiple joins at the same timestamp count separately.
A join exactly at the lower boundary remains included.

## Common mistakes

Do not remove timestamps equal to t - window.
Do not combine types into one count or interpret this as a current-session departure tracker.

## Language notes

Python creates per-type deques with setdefault.
Java uses computeIfAbsent and ArrayDeque, with camelCase getViewers matching the runner's method naming convention.
