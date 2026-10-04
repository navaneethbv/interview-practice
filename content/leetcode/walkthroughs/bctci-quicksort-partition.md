## Intuition

The array needs three contiguous regions: values below `pivot`, values equal to it, and values above it.
Three pointers maintain those regions while the unclassified interval shrinks.

## Brute force

Creating separate lists for smaller, equal, and larger values is simple but uses O(n) extra space.
In-place swaps provide the same grouping with constant auxiliary space.

## Approach

1. Set `smaller` and `current` to the first index and `larger` to the last index.
2. When `arr[current]` is smaller, swap it into the next smaller slot and advance both left pointers.
3. When it is larger, swap it with `arr[larger]` and decrement `larger` without advancing `current`.
4. When it equals the pivot, advance `current`.
5. Stop when `current` passes `larger`.

## Walkthrough

Example 1 uses pivot 4 and starts with `[1, 7, 2, 3, 3, 5, 3]`.
The values 1, 2, and 3 move into the prefix as they are encountered.
The values 7 and 5 move into the suffix through swaps, while equal-to-pivot values would simply advance the scan.
The validator accepts the resulting arrangement because every prefix value is smaller than 4 and every suffix value is larger.

## Complexity

- Time: O(n), because each index is classified and each swap removes at least one unclassified value.
- Space: O(1), since the algorithm stores only three indices and a temporary swap value.

## Edge cases

An empty array exits immediately.
If no value equals the pivot, the middle region has length zero.
If every value equals the pivot, only `current` advances.
Negative values and pivots use the same comparisons without special handling.

## Common mistakes

- Advancing `current` after swapping in an unknown larger value can skip classification.
- Sorting the array solves a different problem and adds unnecessary work.
- Assuming the output must preserve order conflicts with the validator contract.
- Forgetting to shrink `larger` leaves the loop stuck on a large value.

## Language notes

Python swaps tuple-style and Java uses a small `swap` helper.
Both references mutate `arr` in place and expose the same three-way partition invariant.
