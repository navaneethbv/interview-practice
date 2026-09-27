## Intuition

Comparing Euclidean distances does not require computing square roots.
The square-root function preserves order on nonnegative values, so compare `x*x + y*y` instead.
Sorting by this key places the k closest points at the beginning.

## Brute force

Repeatedly scan all unselected points to find the next closest point.
That costs O(nk) time and repeats comparisons of the same distances.
Sorting shares this ordering work, although a bounded heap or selection algorithm can avoid fully sorting when stronger performance is needed.

## Approach

1. Use the sort-by-key pattern, computing squared distance for each point.
2. Create `ordered`, a shallow copy of the outer point collection sorted by increasing squared distance.
3. Return its first k entries.
4. Preserve the x, y coordinate order inside each selected point.

Because the sort key is monotonic with distance, every selected point is at least as close as every unselected point.
The statement guarantees that ties at the selection boundary do not make the chosen collection ambiguous.
These references deliberately retain the Python reference's full-sort algorithm; they do not claim the expected-linear performance of quickselect.
They also preserve the input's outer ordering rather than sorting it in place.

## Walkthrough

Example 1 uses `[[1, 2], [5, 5], [-1, 0]]` and `k = 2`.

| Point | Squared distance | Position after sorting |
| --- | --- | --- |
| `[1, 2]` | 1 + 4 = 5 | Second |
| `[5, 5]` | 25 + 25 = 50 | Third |
| `[-1, 0]` | 1 + 0 = 1 | First |

Thus `ordered` is `[[-1, 0], [1, 2], [5, 5]]`.
Taking its first two entries returns `[[-1, 0], [1, 2]]`.
The result order is valid even though the contract allows any ordering of the selected points.

## Complexity

- Time: O(n log n), dominated by sorting; selecting the prefix adds O(k).
- Space: O(n) for the copied outer collection and sorting workspace, plus O(k) output references.

## Edge cases

For k = n, every input point is returned.
Negative coordinates work because squaring removes the sign.
The origin has squared distance zero and sorts before every nonzero point.
Equal-distance selected points may appear in either order.

## Common mistakes

- Sorting by `x + y` does not compare distances.
- Sorting the coordinates inside each point changes the point itself.
- Claiming linear time describes a different algorithm than this reference.

## Language notes

Python uses `sorted` with a key function; Java clones the outer array and uses `Comparator.comparingInt` with `squaredDistance`.
At coordinate magnitude at most 10000, the squared sum is at most 200000000 and fits Java `int`.
Broader bounds could require `long` arithmetic.
