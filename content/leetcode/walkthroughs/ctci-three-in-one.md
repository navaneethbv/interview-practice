## Intuition

Three independent stacks can share one array if each owns a fixed contiguous segment.
Because the capacity is fixed separately for each stack, empty space in another segment does not make a full stack accept another item.
The sizes array identifies the active prefix of each segment.

## Brute force

Three separate dynamic stacks would make the operations easy, but would not demonstrate storing all values in one shared array.
Moving values between segments is unnecessary under the fixed-capacity contract.

## Approach

Allocate `values` with three times `capacity` entries and initialize the three `sizes` to zero.
The top index of stack s is `s * capacity + sizes[s] - 1`.
Push checks capacity, writes immediately after that index, and increments the size.
Pop checks emptiness, reads the top, and decrements the size.
Peek reads the same position without changing size.
No operation accesses another stack's segment.

## Walkthrough

In Example 1, capacity is 2.
Pushing 5 and 6 onto stack 0 occupies its two slots and returns true twice.
Pushing 7 returns false because stack 0 is full.
Pushing 1 onto stack 2 succeeds independently.
Peek on stack 0 returns 6, pop returns 6, and the next peek returns 5.
Stack 1 has received no items, so `isEmpty(1)` returns true.

## Complexity

Each operation takes O(1) time.
Construction takes O(c) time and space for per-stack capacity c, since the number of stacks is always three.

## Edge cases

Empty pop and peek return -1.
An unsuccessful push leaves both size and stored active values unchanged.
A popped slot can be overwritten by the next push.

## Common mistakes

Incrementing the size before calculating the push slot introduces an off-by-one error.
Using a shared total count would allow one stack to exceed its own capacity.

## Language notes

Python uses lists for both arrays, while Java uses primitive integer arrays.
Old values beyond a stack's active size need not be erased because all reads consult its current size.
