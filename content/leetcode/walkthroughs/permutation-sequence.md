## Intuition

All permutations beginning with the same first digit form a block of factorial size.
The one-based k can select a block directly once converted to zero-based.
Removing the selected digit leaves the same problem for the remaining positions.

## Brute force

Generating every permutation and sorting them takes factorial time and factorial output space.
It also constructs permutations that are never needed for one requested rank.
Factorial block sizes let the reference select each digit without enumerating other permutations.

## Approach

1. List the available digits from 1 through n and decrement k to make it zero-based.
2. Compute the factorial block size for the remaining positions.
3. Divide k by that block size to choose an available digit.
4. Remove the selected digit and keep the remainder within the chosen block.
5. Repeat until no digits remain, then join the selections.

## Walkthrough

Example 1 has n 3 and k 3.
The six permutations are split into blocks of two by their first digit.
Zero-based k is 2, so index 1 selects digit 2 and leaves remainder 0.
The remaining block starts with 1, then 3, producing 213.

## Complexity

There are n selection steps.
With an array or list removal, each removal can shift O(n) remaining digits, giving O(n squared) time and O(n) auxiliary space.
The factorial table in Java and the output string use O(n) space.
Python computes a factorial for each shrinking suffix, which is O(n) arithmetic operations under the bounded n constraint.

## Edge cases

k equal to 1 selects the lexicographically first permutation.
k equal to n factorial selects the last permutation.
The first selected index uses zero-based k after the decrement.
The statement bounds n so factorial values fit the reference representation.

## Common mistakes

- Forgetting to decrement k selects the next block.
- Using factorial of the current count instead of count minus one makes blocks too large.
- Removing a digit before calculating its block index changes available ordering.
- Generating all permutations wastes the rank-selection structure.

## Language notes

Python stores digit strings and uses list pop by index.
Java stores integer digits and appends each selected value to StringBuilder.
Both references follow lexicographic order of digits.
