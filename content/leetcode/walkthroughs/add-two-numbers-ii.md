## Intuition

The digits are stored most significant first, but addition starts at the least significant end.
Stacks reverse access order without reversing the input lists.

## Brute force

Reversing both linked lists in place can simplify addition but changes caller-owned structure.
Copying values into stacks preserves the input links while keeping the addition direct.

## Approach

1. Push each list's digits onto a stack.
2. Pop both stacks from right to left while carrying tens.
3. Create each result node at the front of the result chain.
4. Return the new head.

## Walkthrough

Example 1:

For [1,2,3] and [7,7], add 3 and 7 to get 0 with carry 1.
Then add 2,7,1 to get 0 with carry 1.
Finally add 1 and 1 to get 2, producing [2,0,0].

## Complexity

For lengths a and b, time is O(a+b).
The two stacks use O(a+b) space and the output list also uses O(a+b) nodes.
Python lists and Java deques both preserve the original lists.

## Edge cases

Unequal lengths use zero when one stack is empty.
A final carry creates a new leading node.
Zero plus zero returns a single zero node under the input contract.

## Common mistakes

Do not add from the head when digits are most significant first.
Push the new digit before the current result head.
Continue while a carry remains after both stacks empty.

## Language notes

Python uses lists and ListNode construction.
Java uses an integer deque and the supplied ListNode type.
The result is built from the least significant digit toward the front.
