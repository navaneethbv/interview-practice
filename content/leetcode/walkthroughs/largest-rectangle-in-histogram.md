## Intuition

A bar's height can extend across neighboring bars that are at least as tall.
When a shorter bar arrives, it fixes the right boundary for taller bars waiting on a stack.
Store each waiting height with the earliest position from which it can extend.

## Brute force

For every starting position, extend the right boundary while maintaining the minimum height of the interval.
Computing area for all such intervals takes O(n²) time.
A monotonic stack resolves each bar's maximal useful width only once.

## Approach

1. Maintain `pending` pairs of `(start, height)` with nondecreasing heights and initialize `best = 0`.
2. Scan each bar and one additional virtual bar of height zero.
3. Initialize the current `start` to `index`.
4. While the stack's top height exceeds the current height, pop its entry and compute its area as `previous_height * (index - start)` using the popped start.
5. Carry that popped start leftward for the new shorter height.
6. Push the resulting start and current height, then return `best` after the scan.

The carried start includes every position through which the popped taller bars could extend.
Equal heights remain on the stack; when later popped, the earliest equal-height entry supplies the widest candidate.
The virtual zero closes every remaining positive-height rectangle without changing the input.

## Walkthrough

Example 1 is `[2, 4, 4, 1]`.

| Index | Height | Areas resolved | `pending` afterward |
| --- | --- | --- | --- |
| 0 | 2 | None | `[(0,2)]` |
| 1 | 4 | None | `[(0,2),(1,4)]` |
| 2 | 4 | None | `[(0,2),(1,4),(2,4)]` |
| 3 | 1 | 4, 8, 6 | `[(0,1)]` |
| 4 | Virtual 0 | 4 | `[(0,0)]` |

The largest area is 8, from height 4 spanning indices 1 and 2.

## Complexity

- Time: O(n), because each entry is pushed once and popped at most once.
- Space: O(n), for the monotonic stack.

## Edge cases

All-zero bars produce zero.
Increasing heights are resolved by the virtual final bar.
Equal heights can span the full histogram.
The maximum allowed area is 100000 × 10000 = 1000000000, which fits a signed Java integer.

## Common mistakes

- Using `index - start + 1` includes the shorter blocking bar.
- Forgetting to carry the earliest popped start loses valid widths.
- Omitting the final flush leaves increasing suffixes unresolved.

## Language notes

Python uses tuples and Java uses a `Bar` record.
Both use an extra loop iteration for the virtual bar rather than appending to the caller's array.
The stack implementations differ syntactically but apply the same strict height comparison.
