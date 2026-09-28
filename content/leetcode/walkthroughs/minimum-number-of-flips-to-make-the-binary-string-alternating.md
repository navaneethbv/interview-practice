## Intuition
Rotating the string changes which character is first, so every length-N window of the doubled string represents one rotation.
For each window, count mismatches against one alternating pattern; the opposite pattern needs `N - mismatches` flips.

## Brute force
Building each rotation and comparing both patterns costs O(N^2).
The doubled string and sliding mismatch count reuse adjacent rotations in linear time.

## Approach
1. Traverse the doubled string and compare each position with its expected parity.
2. Add the new mismatch when the right end advances.
3. Remove the character leaving the window after N positions.
4. For every full window, minimize mismatches and their complement.

## Walkthrough
Example 1 is `"111000"`.
The original window has four mismatches against `010101` and two against its complement `101010`, so its best cost is 2.
The other rotations are represented as the window moves through `"111000111000"`, and none improves that value.
The answer is 2.

## Complexity
The doubled traversal performs O(N) updates and uses O(N) time.
Python explicitly creates `s + s`, so it uses O(N) extra string space; Java indexes the original string and uses O(1) extra space.

## Edge cases
An already alternating string returns zero.
Rotations can make a string alternating even when the original arrangement is not.
Length one needs no flips.

## Common mistakes
Checking only the original string misses useful rotations.
Comparing against one pattern without taking the complement can double the answer.
Failing to remove the outgoing mismatch lets the window grow beyond N.

## Language notes
Python tracks mismatch counts as booleans converted to integers.
Java computes both characters through modulo indexing without allocating the doubled string.
