## Intuition

For each total value, the last square used can be any square no larger than that value.
The best count is one plus the best count for the remaining value.
Bottom-up dynamic programming ensures every remainder is already known.

## Brute force

A recursive method could try every square at every position.
That repeats the same remainder subproblems exponentially.
The dynamic program computes each value once and considers its available squares.

## Approach

1. Create minimumCounts with zero squares needed for value zero.
2. Precompute square values up to n.
3. For each value from one through n, try every square no larger than it.
4. Minimize one plus the count for value minus square.
5. Return the count for n.

## Walkthrough

Example 1 asks for 12.
The dynamic program can form 12 as 4 plus 4 plus 4, using three squares.
It also checks combinations involving 1, 4, and 9, but none use fewer than three.
The method returns 3.

## Complexity

There are O(n) values and O(sqrt n) square candidates per value.
The time complexity is O(n times sqrt n).
The dynamic-programming array and square list use O(n) space.
The returned answer is one integer.

## Edge cases

Zero needs zero squares.
A perfect square can use one square.
The loop stops considering squares after they exceed the current value.
The positive input contract ensures the array allocation is valid.

## Common mistakes

- Starting minimum counts at zero for positive values makes every answer look free.
- Including squares larger than the current value indexes a negative remainder.
- Returning the number of squares tried is not the minimum.
- Recursive branching without memoization repeats the same values.

## Language notes

Python precomputes a square list and breaks once a square is too large.
Java generates square roots up to the current value inside each row.
Both use the same recurrence and integer counts.
