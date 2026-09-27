## Intuition

Treat an index as a node whose next pointer is `nums[index]`.
Every value is a valid index from 1 through n, so following pointers from index 0 eventually enters a cycle.
The cycle entry is the duplicated value because it has an incoming edge from both the preceding path and the cycle.

## Brute force

Comparing all pairs finds a repeated value in O(n²) time and O(1) space.
A set is faster but needs O(n) additional storage, while sorting changes the array.
Floyd's cycle-detection algorithm meets the constant-space and no-mutation requirements.

## Approach

1. Initialize `slow` and `fast` to `nums[0]`.
2. Repeatedly move `slow` one pointer step and `fast` two steps until they meet.
3. Reset `slow` to `nums[0]`, keeping `fast` at the meeting point.
4. Move both one step at a time until they meet again.
5. Return that meeting value, the cycle entry.

The first meeting establishes a distance relationship modulo the cycle length.
After the reset, the distance to the entry along the starting path matches the meeting pointer's remaining distance modulo that length.
They therefore meet at the entry even if the duplicate occurs more than twice.

## Walkthrough

Example 1 uses `[1, 4, 2, 3, 2]`.
The reachable pointer sequence from index 0 is `0 -> 1 -> 4 -> 2 -> 2`.

| Phase | `slow` | `fast` |
| --- | --- | --- |
| Initialize | 1 | 1 |
| First movement | 4 | 2 |
| Second movement | 2 | 2 |
| Reset slow | 1 | 2 |
| Move together | 4 | 2 |
| Move together | 2 | 2 |

The repeated value is 2.
The self-cycle at index 3 is irrelevant because it is not reached from index 0.

## Complexity

- Time: O(n), because both phases traverse at most a linear number of path and cycle steps.
- Space: O(1), because only two integer positions are maintained.

## Edge cases

For `[1, 1]`, the entry is immediately found after movement.
A value repeated many times still determines the unique duplicated value.
The array is never modified, and negative or out-of-range entries are outside the contract.

## Common mistakes

- Comparing initial equal pointers before moving skips cycle detection.
- Returning the first meeting point does not generally return the entry.
- Advancing by index arithmetic instead of `nums[index]` does not follow this graph.

## Language notes

Python uses a loop with an explicit break; Java uses `do` and `while` to ensure the first movement happens.
Both reset to `nums[0]`, matching their initialization convention, and use integer indices without allocating actual linked-list nodes.
