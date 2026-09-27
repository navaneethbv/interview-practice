## Intuition

The predicate is monotonic: once isBadVersion is true, every later version is bad.
Binary search finds the first true position by preserving a candidate interval.
The midpoint formula avoids overflow when n is near the signed integer maximum.

## Brute force

Checking versions from 1 upward can require n API calls.
Binary search reduces the calls to logarithmic time.

## Approach

1. Set lower = 1 and upper = n.
2. Compute middle inside the current interval.
3. If middle is bad, keep it and discard the higher half.
4. Otherwise discard middle and every lower version.
5. Stop when lower equals upper and return that version.

## Walkthrough

Example 1 has n = 7 and bad = 5.
The interval [1,7] tests 4, which is good, so it becomes [5,7].
The interval [5,7] tests 6, which is bad, so it becomes [5,6].
The interval [5,6] tests 5, which is bad, so it becomes [5,5].
The answer is 5.

## Complexity

- Time: O(log n) calls to isBadVersion.
- Space: O(1), for the interval endpoints.

## Edge cases

If version 1 is bad, every midpoint eventually moves upper to 1.
If only version n is bad, the interval converges at n.
The midpoint calculation lower + (upper - lower) / 2 avoids integer overflow.
The provided environment supplies the API and the configured bad version.

## Common mistakes

- Moving lower to middle instead of middle plus one after a good result can loop.
- Returning the last tested bad version is not a proof of firstness.
- Calling the API outside the current interval wastes the logarithmic bound.
- Using (lower + upper) / 2 can overflow for maximum n.

## Language notes

Python calls the provided global isBadVersion function.
Java inherits the same API from VersionControl.
