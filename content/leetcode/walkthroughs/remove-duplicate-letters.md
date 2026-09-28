## Intuition
The answer is a subsequence containing each letter once.
A monotonic stack can remove a larger letter when it will appear again later, making room for a smaller letter without losing feasibility.

## Brute force
Trying every subsequence is exponential.
Greedy stack decisions work because remaining counts reveal whether a removed letter can be reinserted later.

## Approach

1. Count remaining occurrences for each character.
2. Scan the string from left to right and decrement the current count.
3. Skip a character already in the stack.
4. Otherwise, pop larger stack characters while each has another occurrence remaining.
5. Mark popped characters unused, then append the current character and mark it used.
6. The stack is the lexicographically smallest feasible prefix at every step.

## Walkthrough
For Example 1, `bcabc` first pushes `b` and `c`.
When `a` arrives, both `c` and `b` appear again later, so they are popped and `a` is pushed.
The later `b` and `c` complete the stack as `abc`.
For `cbacdcbc`, the same rule keeps `acdb` as the smallest subsequence that still contains all four letters.

## Complexity
Each character is pushed once and popped at most once, so time is O(n).
The stack, counts, and used set use O(A) space for alphabet size A, plus the returned string.

## Edge cases
A string with one distinct character returns that character.
A character that will not appear again must never be popped.
Repeated occurrences after a character is already used are skipped.

## Common mistakes
Pop only when the top character has a remaining occurrence.
Mark a popped character unused before it can be pushed again.
Do not sort the input because subsequence order must be preserved.

## Language notes
Python uses `Counter`, a list, and a set.
Java uses fixed arrays and `StringBuilder` for the stack.
