## Intuition

Because `arr` is sorted, every valid answer is a contiguous window of length `k`.
When comparing two neighboring candidate windows, the decision depends only on the value entering from the right and the value leaving on the left.
Binary search finds the first window whose left side is no farther than the competing right value, with ties favoring the left window.

## Brute force

Computing every length-k window's total distance to `x` takes O((n-k+1)k) time.
Sorting all n values by distance takes O(n log n) time and needs extra arrangement work, while the sorted input already exposes the window boundary.

## Approach

1. Search possible window starts in `[0, len(arr) - k]`.
2. At `middle`, compare `left_distance = x - arr[middle]` with `right_distance = arr[middle + k] - x`.
3. Move right when the right candidate is closer, otherwise keep the left half, which preserves the left-side tie preference.
4. Return the length-k slice beginning at the final `left`.

## Walkthrough

Example 1 uses `arr = [1,2,3,4,5]`, `k = 4`, and `x = 3`.

| `left` | `right` | `middle` | left distance | right distance | decision |
| ---: | ---: | ---: | ---: | ---: | --- |
| 0 | 1 | 0 | 2 | 2 | tie, set `right = 0` |

The only remaining start is 0, so the returned window is `[1,2,3,4]` and the tied value 1 is kept over 5.

## Complexity

- Time: O(log(n-k+1) + k), for the binary search and returned slice.
- Space: O(k) in Python for the returned slice, and O(k) in Java for the returned list.

## Edge cases

When `k` equals n, the only start is zero.
If `x` lies outside the array, the window settles at the nearest end.
Duplicate values remain in their original sorted order.
Equal distances choose the smaller values because the search keeps the left window.

## Common mistakes

- Comparing absolute distances to the window center ignores the sorted-window boundary rule.
- Moving right on equality violates the required preference for smaller values.
- Returning indices instead of the values changes the method contract.

## Language notes

Python returns a list slice, which allocates the output values.
Java explicitly copies the chosen interval into an `ArrayList<Integer>`.
The arithmetic uses the sorted order and does not mutate `arr`.
