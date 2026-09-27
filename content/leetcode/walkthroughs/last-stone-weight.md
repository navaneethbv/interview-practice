## Intuition

Every step needs the two largest remaining weights, even after their replacement creates a new weight.
A max-heap supports this changing priority order efficiently.
The rest of the stones need not be fully sorted after each smash.

## Brute force

Sort all remaining stones before every smash and take the final two entries.
Across up to n - 1 rounds, repeated sorting can cost O(n² log n).
A heap updates only the affected priority positions.

## Approach

1. Use a max-heap containing every initial stone weight.
2. While more than one stone remains, remove `heaviest` and `second`.
3. If their weights differ, insert `heaviest - second`.
4. If they are equal, insert nothing because both disappear.
5. Return the sole remaining weight, or zero if the heap is empty.

Each round follows the exact operation specified in the statement, and the heap guarantees that the removed stones are the required pair.
The number of stones decreases by at least one per round, so the process terminates.
A replacement weight may fall anywhere in the remaining order, which is why a fixed initial sort alone is insufficient.

## Walkthrough

Example 1 starts with `[2, 5, 9]`.
Contents below are shown in descending order conceptually.

| Remaining weights | Removed pair | Replacement | Weights afterward |
| --- | --- | --- | --- |
| `[9, 5, 2]` | 9 and 5 | 4 | `[4, 2]` |
| `[4, 2]` | 4 and 2 | 2 | `[2]` |

The loop stops with one stone and returns 2.
The replacement 4 becomes the next heaviest stone; it is not processed in its former input position.

## Complexity

- Time: O(n log n), from at most n - 1 rounds with heap operations; Java's repeated initial insertions also fit this bound.
- Space: O(n), because the heap stores at most all original stones.

## Edge cases

A single stone is returned unchanged.
Two equal stones leave an empty heap and return zero.
Equal weights in a larger collection are separate stones and must not be deduplicated.
Positive input weights ensure a differing pair produces a positive replacement.

## Common mistakes

- Using a min-heap of ordinary positive weights smashes the lightest stones.
- Reinserting a zero after an equal pair adds a stone that should not exist.
- Assuming the remaining array stays sorted after inserting a difference can choose the wrong next pair.

## Language notes

Python's `heapq` is a min-heap, so the reference stores negated weights and reverses their signs when removing them.
Java uses `Comparator.reverseOrder()` with positive weights.
Python builds its initial heap with linear-time `heapify`; both versions have the same overall O(n log n) bound.
