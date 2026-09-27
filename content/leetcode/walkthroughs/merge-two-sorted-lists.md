## Intuition

The smallest remaining value must be at one of the two list heads because each input is sorted.
Append the smaller head to the output and advance only that input.
A dummy node gives every appended node the same handling, including the first one.

## Brute force

Collect all values, sort them, and allocate a new list.
This takes O((m + n) log(m + n)) time and linear extra storage for list lengths m and n.
Merging the existing sorted streams needs neither another sort nor replacement data nodes.

## Approach

1. Create a dummy node and let `tail` point to it.
2. While both inputs are nonempty, compare `list1.val` and `list2.val`.
3. Attach the smaller node to `tail.next`, advance that input pointer, then advance `tail`.
4. When one list ends, attach the entire remaining suffix of the other list.
5. Return `dummy.next`.

The output prefix remains sorted because the chosen head is no greater than any remaining node in either input.
The dummy's own value is irrelevant because it is excluded from the returned list.

## Walkthrough

Example 1 merges `[1, 4]` with `[2, 3, 5]`.

| Available heads | Node appended | Output prefix |
| --- | --- | --- |
| 1, 2 | 1 | `[1]` |
| 4, 2 | 2 | `[1, 2]` |
| 4, 3 | 3 | `[1, 2, 3]` |
| 4, 5 | 4 | `[1, 2, 3, 4]` |
| Empty, 5 | Attach remaining suffix | `[1, 2, 3, 4, 5]` |

All occurrences are retained in sorted order.

## Complexity

- Time: O(m + n) as a worst-case bound, selecting nodes until one input is exhausted.
- Space: O(1) auxiliary space, because existing nodes are reused and only one dummy is allocated.

## Edge cases

Two empty inputs return null.
One empty input returns the other list directly through the dummy link.
Equal values are retained from both lists; these references choose the first list on a tie.

## Common mistakes

- Advancing both input pointers after every comparison drops nodes.
- Forgetting the remaining suffix truncates the result.
- Returning the dummy instead of its next node adds an unwanted output value.

## Language notes

Python uses truthiness to test node presence and `list1 or list2` for the remaining suffix.
Java uses explicit null checks and a conditional expression.
Both versions rewire input links, so the original lists are consumed as separate structures.
