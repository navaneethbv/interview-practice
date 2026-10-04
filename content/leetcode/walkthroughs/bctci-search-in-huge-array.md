## Intuition

The array is sorted, but its length is hidden behind a sentinel reader.
Exponential probing finds a range that must contain the target or the end of the array.
Ordinary binary search then finds the first target index within that range.

## Brute force

Reading indices from zero upward can require linear reads before reaching a large target.
Doubling the bound reaches the relevant scale in logarithmic probes.

## Approach

1. Start with `bound = 1` and read index `bound - 1`.
2. Double `bound` while that value is less than `target`.
3. Search the inclusive interval `[bound // 2, bound - 1]` for the first value at least `target`.
4. Return the lower bound if it equals `target`, otherwise return `-1`.

## Walkthrough

Example 1 searches for 5 in `[1, 3, 5, 7, 9]`.
The first probe reads index 0 and sees 1, then the doubled bound probes index 1 and sees 3, then index 3 and sees 7.
Binary search narrows the range from indices 2 through 3 to index 2 because 5 is the first value at least the target.
The final reader call confirms index 2 contains 5.

## Complexity

- Time: O(log p), where p is the target's first possible index or the hidden array length when the target is absent.
- Space: O(1), using only bounds and one reader value at a time.

## Edge cases

An empty array returns `-1` after the sentinel bounds the search.
A target smaller than the first value searches the first interval and fails cleanly.
Duplicates are allowed, so the lower-bound search is required for the smallest index.
The sentinel is treated as greater than every valid target.

## Common mistakes

- Returning the first matching probe can miss an earlier duplicate.
- Using a fixed high index defeats the hidden-length contract.
- Moving `low` on equality returns an arbitrary duplicate instead of the first.
- Forgetting the final equality check returns an insertion position for absent targets.

## Language notes

Python receives `math.inf` from the reader past the end.
Java receives `Integer.MAX_VALUE` and uses unsigned midpoint arithmetic.
Both implementations query only through `reader.get` and never assume a length API.
