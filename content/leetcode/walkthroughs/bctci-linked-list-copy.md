## Intuition

Copying a linked list requires copying its structure as well as its values.
The output must contain newly allocated nodes connected in the original order.
A dummy node and a moving tail make appending the first copied node identical to appending every later node.

## Brute force

A recursive copy can allocate one node and recursively copy the remaining suffix.
It has linear running time but also uses a linear call stack, which is undesirable for up to 100,000 nodes.

## Approach

Allocate `dummy` and point `tail` at it.
Walk the original list from its head to the null terminator.
For each original node, allocate `ListNode` with its value and assign it to `tail.next`.
Advance `tail` to that fresh node before moving along the input.
Return `dummy.next`, excluding the dummy from the copied list.
After each iteration, the chain after dummy is a fresh copy of exactly the processed input prefix, and tail points to its final node.

## Walkthrough

Example 1 contains nodes with values 1, 2, and 3.
The first iteration creates a fresh 1 node after dummy and moves tail to it.
The next iteration creates a fresh 2 node after that copy, followed by a fresh 3 node.
The resulting values serialize as `[1, 2, 3]`, just like the input.
However, every returned node is a separate allocation, and the original three nodes retain their original links.

## Complexity

Each of n nodes is visited and copied once, giving O(n) time.
The required new list occupies O(n) space.
Beyond that output, the dummy and traversal pointers use O(1) auxiliary space.

## Edge cases

For an empty input, the loop does nothing and `dummy.next` is null.
Duplicate values are copied independently rather than merged.

## Common mistakes

Returning the original head is not a copy.
Assigning an original node to `tail.next` would share structure and violate the new-node requirement.

## Language notes

Both references use the harness's `ListNode.val` field.
Python advances its local `head` variable; Java walks with a separate `node`, and neither operation mutates the caller's list.
