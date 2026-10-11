## Intuition

Only two links change: the node just before index a must point to the head of list2, and the tail of list2 must point to the node just after index b. Because a is at least 1, the head of list1 never changes.

## Approach

1. Walk a - 1 steps to the node before index a.
2. From there, walk b - a + 2 more steps to the node after index b.
3. Link the first node to list2's head.
4. Walk to list2's tail and link it to the second node.

## Walkthrough

In Example 1, the node before index 3 is 13 and the node after index 4 is 5. Linking 13 to 100 and 102 to 5 gives 10, 1, 13, 100, 101, 102, 5.

## Complexity

- Time: O(n + m).
- Space: O(1).

## Edge cases

- a equal to b removes a single node.
- list2 of length 1 is both head and tail.

## Common mistakes

- Off-by-one in the second walk, which removes one node too many or too few.
- Losing the reference to the node after b before relinking.
