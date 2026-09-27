## Intuition

The median lies at the boundary between the lower and upper halves of the sorted stream.
A max-heap `low` exposes the largest lower-half value, while a min-heap `high` exposes the smallest upper-half value.
Keeping their sizes equal, or giving `low` one extra value, makes every median query immediate.

## Brute force

Store all values and sort them for every median query.
A query after n insertions can then cost O(n log n).
Two heaps maintain just enough order during insertion to answer queries in constant time.

## Approach

1. Insert the new number into `low`.
2. Move `low`'s maximum into `high`, restoring the ordering between the halves.
3. If `high` now has more elements, move its minimum back into `low`.
4. For an odd count, return the maximum of `low`.
5. For an even count, average the maximum of `low` and minimum of `high`.

After rebalancing, every lower-half value is at most every upper-half value.
The size invariant identifies exactly which boundary values occupy the middle positions.
The heaps do not need to be fully sorted internally.

## Walkthrough

Example 1 inserts 4, queries, inserts 9, then queries again.
Heap contents below show actual values conceptually, including Python's negated lower-heap storage after interpretation.

| Operation | `low` values | `high` values | Output |
| --- | --- | --- | --- |
| `addNum(4)` | `[4]` | `[]` | `null` |
| `findMedian()` | `[4]` | `[]` | 4.0 |
| `addNum(9)` | `[4]` | `[9]` | `null` |
| `findMedian()` | `[4]` | `[9]` | 6.5 |

The even-sized stream averages 4 and 9.

## Complexity

- Time: O(log n) per insertion and O(1) per median query.
- Space: O(n), because all inserted values remain in one heap or the other.

## Edge cases

A single insertion supplies the median directly.
Duplicate and negative values obey the same ordering and balancing rules.
Queries are guaranteed to occur only after an insertion.
Alternating very small and very large values remain balanced.

## Common mistakes

- Balancing sizes without preserving cross-heap ordering can expose the wrong middle values.
- Using integer division loses fractional medians.
- Treating the heap's entire storage as sorted is unnecessary and incorrect.

## Language notes

Python implements the max-heap by storing negated values in `low`.
Java uses `Collections.reverseOrder()` for that heap.
Java converts the first boundary value to `double` before addition, avoiding integer-sum overflow in a broader value range as well as preserving the fractional result.
