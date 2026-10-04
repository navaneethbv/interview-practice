## Intuition

Sorting makes the direction of a useful adjustment predictable.
Once `first` is fixed, the remaining question is whether two later positions sum to `w - arr[first]`.
A small pair sum needs a larger left value; a large pair sum needs a smaller right value.

## Brute force

Try every triple of distinct indices and compare its sum with `w`.
This takes O(n³) time and constant auxiliary space, but repeatedly explores pairs without using their order.

## Approach

Sort `arr`, then choose each possible `first` before the final two positions.
Initialize `left = first + 1` and `right = n - 1`.
Compute `total` from those three positions and return true when it equals `w`.
If it is too small, every pair using that left value and a smaller right value also fails, so increment `left`.
Apply the symmetric argument to decrement `right` when the sum is too large.
Return false after every candidate first position is exhausted.

## Walkthrough

Example 1 sorts `[2, 2, -1, 8]` into `[-1, 2, 2, 8]`.
With `first = 0`, `left = 1`, and `right = 3`, the total is 9.
Move `right` to 2; the total becomes `-1 + 2 + 2 = 3`.
The function returns true, using the two distinct positions containing 2.

## Complexity

Sorting takes O(n log n), and the nested pointer scans take O(n²) overall.
The search itself uses O(1) space; Python sorting may use O(n) temporary space, while Java primitive sorting uses a logarithmic stack.

## Edge cases

Fewer than three values return false naturally.
Zeros, negative values, and duplicates need no special branch.

## Common mistakes

Do not allow `left == right`, which would reuse one element.
Skipping duplicate values is unnecessary for this boolean result.

## Language notes

Both references sort the input in place.
Java `int` safely holds sums of three values under the stated bounds; Python integers grow automatically.
