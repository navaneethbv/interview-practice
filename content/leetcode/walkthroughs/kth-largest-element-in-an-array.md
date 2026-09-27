## Intuition

The kth largest value is the smallest among the largest k entries.
Maintain exactly that leading group in a min-heap while scanning the array.
Values below its boundary can be discarded permanently because at least k processed values already rank ahead of them.

## Brute force

Sort the whole array in descending order and take index k - 1.
That takes O(n log n) time even when k is small, and an in-place sort changes the input.
The reference uses a bounded heap to avoid fully sorting and to preserve the input order.

## Approach

1. Use the top-k heap pattern with an initially empty `heap`.
2. For each `value`, push it into the min-heap.
3. If its size exceeds k, remove the smallest entry.
4. After processing all values, return the minimum of the retained k entries.

The invariant is that the heap contains the largest min(k, processed-count) entries of the prefix.
Inserting the next value and dropping the smallest of k + 1 candidates preserves it.
Duplicate occurrences remain separate heap entries, exactly as required by the ranking definition.
Quickselect can achieve expected O(n) time, but these references intentionally use the same O(n log(k + 1)) heap algorithm in both languages.

## Walkthrough

Example 1 uses `[7, 2, 5, 5, 1]` and `k = 3`.
The retained contents are displayed in sorted order for readability.

| `value` | Action | Retained values |
| --- | --- | --- |
| 7 | Insert | `[7]` |
| 2 | Insert | `[2, 7]` |
| 5 | Insert | `[2, 5, 7]` |
| 5 | Insert, then remove 2 | `[5, 5, 7]` |
| 1 | Insert, then remove 1 | `[5, 5, 7]` |

The minimum retained value is 5, so the third largest occurrence is 5.

## Complexity

- Time: O(n log(k + 1)), because every element performs a heap insertion and at most one removal.
- Space: O(k), allowing k + 1 temporary entries before removal.

## Edge cases

For k = 1, the heap retains the maximum.
For k = n, no entry is removed and its minimum is the array minimum.
All-equal inputs still have distinct ranked occurrences.
Negative numbers need no sentinel or special handling.

## Common mistakes

- Deduplicating before ranking returns the kth distinct value instead.
- Using a max-heap with the same removal rule retains the smallest values.
- Assuming the whole heap is sorted is unnecessary; only its root is guaranteed minimal.

## Language notes

Python uses `heapq.heappush` and `heappop`; Java uses `PriorityQueue.add` and `remove`.
Both return the min-heap root and leave `nums` untouched.
The use of log(k + 1) states the linear-time behavior correctly even when k equals one.
