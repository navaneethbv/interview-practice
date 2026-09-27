## Intuition

Move slow by one node and fast by two nodes.
When fast reaches the end, slow has covered half the list.
For an even length, the extra fast step moves slow to the second middle node automatically.

## Brute force

Counting the list first and walking to its midpoint needs two passes.
The two-pointer scan finds the same node in one pass without storing nodes.

## Approach

1. Set slow and fast to head.
2. While fast and fast.next exist, advance slow once and fast twice.
3. Return slow when fast can no longer advance two nodes.

## Walkthrough

Example 1 uses head = [1, 2, 3, 4, 5].
Initially both pointers are at 1.
After the first iteration, slow is 2 and fast is 3.
After the second, slow is 3 and fast is 5.
Fast cannot advance twice, so the returned suffix is [3, 4, 5].

## Complexity

- Time: O(n), because fast and slow traverse the list once.
- Space: O(1), for two node references.

## Edge cases

A one-node list returns its only node.
An even-length list returns the later of the two middle nodes.
Repeated values do not matter because the algorithm follows node identity.
The nonempty input guarantee makes the initial references valid.

## Common mistakes

- Moving fast only one step returns the wrong middle.
- Checking only fast instead of fast.next can dereference null.
- Returning slow before completing the loop chooses the earlier middle.
- Creating copied nodes loses the required suffix identity.

## Language notes

Python follows next references directly.
Java uses the harness-provided ListNode with the val field.
