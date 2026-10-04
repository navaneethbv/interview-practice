## Intuition

Some earlier positions are still waiting for their first larger value.
If a new value exceeds the value at the most recent waiting position, it resolves that position immediately.
A monotonic stack keeps precisely these unresolved positions in an order that supports efficient resolution.

## Brute force

For every position, scan rightward until finding a strictly larger value.
A decreasing array forces almost every scan to reach the end, producing O(n squared) time.

## Approach

Initialize `answer` to -1 and keep an empty stack of indices.
Read the array left to right.
While the new value is strictly larger than the value at the stack's final index, pop that index and record the current index as its answer.
Then append the current index to the stack.
Values referenced by the stack remain nonincreasing.
A popped position has seen no earlier larger value, or it would already have been removed, so the current position is exactly its first qualifying answer.
Unresolved positions retain their initialized -1 values.

## Walkthrough

Example 1 starts with values `[2, 2, 4, 3]`.
Indices 0 and 1 both enter the stack because equal 2s do not qualify as strictly greater.
At index 2, value 4 pops index 1 and then index 0, assigning answer 2 to both.
The final value 3 cannot resolve the waiting 4, and neither remaining position finds anything larger afterward.
The result is `[2, 2, -1, -1]`.

## Complexity

Each index is pushed once and popped at most once.
Both references therefore take O(n) time despite the nested while loop.
The answer array and stack each use O(n) worst-case space.

## Edge cases

A single element returns -1.
Equal or decreasing arrays leave every answer at -1, while an increasing array resolves each position at its immediate successor.

## Common mistakes

Store and return indices, not values.
Popping on equality would violate the strictly-larger requirement.

## Language notes

Python uses a list as the stack.
Java uses the back of an `ArrayDeque<Integer>` and fills the answer array with -1 explicitly.
