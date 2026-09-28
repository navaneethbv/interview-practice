## Intuition

Scanning from right to left, a decreasing stack stores the visible candidates that have not been hidden by a taller person.
Every shorter stack entry popped by person i is visible, and the first remaining taller entry is also visible.

## Brute force

Looking right from every person and checking all intervening heights costs O(n^2).
The monotonic stack removes each height once.

## Approach

1. Process people from the end toward the front.
2. Pop every stack height shorter than the current height and count those visible people.
3. If a taller person remains, count that first blocker.
4. Push the current height for people farther left.

## Walkthrough

For Example 1, heights are `[10,6,8,5,11,9]`.
From the right, 9 sees nobody, and 11 pops 9 and sees it.
Height 5 sees 11, while 8 pops 5 and then sees 11.
Height 6 sees 8, and 10 pops 6 and 8 before seeing 11, giving `[3,1,2,1,1,0]`.

## Complexity

Each person is pushed once and popped at most once, so time is O(n).
The stack and output array use O(n) space in both languages.
The output itself requires O(n) storage.

## Edge cases

The last person always sees zero people.
A strictly increasing queue gives one visible neighbor for each nonfinal person.
Distinct heights avoid equal-height tie rules.

## Common mistakes

Count the first remaining taller person after popping shorter ones.
Do not scan the stack from the bottom for every person.
Process from right to left so the stack represents the already processed suffix.

## Language notes

Python uses a list as a stack.
Java uses `ArrayDeque<Integer>` and an `int[]` result.
