## Intuition

Classify each valid ordered sequence by its final value.
Removing that value leaves an ordered sequence for a smaller total.
Summing those smaller counts includes every valid sequence exactly once, because its final value identifies a unique group.

## Brute force

Recursively append every value that does not exceed the remaining target.
This can create exponentially many branches, repeatedly recomputing counts for the same remaining totals.
Dynamic programming aggregates those branches into one state per total.

## Approach

1. Define `ways[total]` as the number of ordered sequences summing to `total`.
2. Initialize `ways[0] = 1`, representing the empty prefix, and other states to zero.
3. Process totals in increasing order.
4. For each `value <= total`, add `ways[total - value]` to `ways[total]`.
5. Return `ways[target]`.

All values are positive, so transitions always use completed smaller states.
Putting the total loop outside the value loop counts different final-value choices separately and therefore counts orderings.

## Walkthrough

Example 1 uses `nums = [1, 3]` and `target = 4`.

| `total` | Contributions by final value | `ways[total]` |
| --- | --- | --- |
| 0 | Empty sequence | 1 |
| 1 | `ways[0]` for final 1 | 1 |
| 2 | `ways[1]` for final 1 | 1 |
| 3 | `ways[2] + ways[0]` | 2 |
| 4 | `ways[3] + ways[1]` | 3 |

At total 4, ending in 1 gives `[1,1,1,1]` and `[3,1]`, while ending in 3 gives `[1,3]`.
Return 3.

## Complexity

- Time: O(target × c) arithmetic transitions, where c is the number of values.
- Space: O(target) DP entries; Python's exact integer entries may require more than one machine word for large intermediate counts.

## Edge cases

Unreachable totals retain zero.
A value larger than the current total is skipped.
Distinct positive inputs prevent duplicate-value counting and zero-length cycles.
The empty-prefix base case does not add an extra nonempty answer for a positive target.

## Common mistakes

- Reversing the loop order counts unordered combinations instead.
- Initializing `ways[0]` to zero prevents all sequences from starting.
- Allowing zero or negative values invalidates the backward-only dependency argument.

## Language notes

Python retains exact integer counts.
Java sums into `long` and caps each stored count at `Integer.MAX_VALUE` to avoid overflow in intermediate states.
Because transitions only add nonnegative counts, capping cannot change a final answer that is guaranteed to fit the bound; an oversized state that contributes to the target would already force an oversized answer.
With at most 200 denominations, summing capped states safely fits `long`.
