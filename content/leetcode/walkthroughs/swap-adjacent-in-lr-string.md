## Intuition

X is an empty position, L can move only left, and R can move only right.
Removing X from both strings exposes the same moving pieces, while their positions must also respect those directions.

## Brute force

Simulating every possible move branches whenever an adjacent swap is available.
The state search can be exponential because many move orders reach the same visible arrangement.

## Approach

1. Collect the non-X pieces from start and result.
2. Reject when their L and R order differs.
3. Match each piece position, requiring an L position not to move right and an R position not to move left.
4. Return true only when every piece passes.

## Walkthrough

Example 1:

For start RXXLRXRXL and result XRLXXRRLX, removing X from both gives RLRRL in both strings.
The matching piece positions are R at 0 to 1, L at 3 to 2, R at 4 to 5, R at 6 to 6, and L at 8 to 7.
Each R moves right or stays and each L moves left or stays.
No piece order changes, so the result is true.

## Complexity

The scan and piece comparisons take O(n) time.
Python stores filtered piece lists and uses O(n) auxiliary space.
Java scans the strings with pointers and uses O(1) auxiliary space.

## Edge cases

Strings containing only X have no pieces to compare and are valid.
Different lengths immediately fail.
Any mismatch in the non-X sequence makes the transformation impossible.

## Common mistakes

Do not allow L to move right or R to move left.
Do not treat X as a meaningful piece when comparing order.
Check the original positions, not just the final non-X sequence.

## Language notes

Python makes filtered lists for clarity.
Java uses a helper to find the next non-X character and keeps the scan constant-space.
