## Intuition
A prefix-sum matrix answers any square-sum query in constant time after preprocessing.
If a side length is feasible, every smaller side is feasible, so binary search can find the largest valid side.

## Brute force
Enumerating every top-left corner and expanding every possible side is O(RC min(R,C)^2) even with prefix sums.
Binary search reduces the number of tested side lengths to O(log min(R,C)).

## Approach
1. Build a two-dimensional prefix sum with an extra zero row and column.
2. Binary search `side` between zero and `min(R,C)`.
3. For each candidate, scan every top-left position and use four prefix corners to compute its sum.
4. Move the lower bound upward when a square fits, otherwise lower the upper bound.

## Walkthrough
Example 1 is a 3 by 3 matrix of ones with threshold `4`.
A candidate side of 1 fits because every cell sums to 1.
A candidate side of 2 also fits because every 2 by 2 block sums to 4, while side 3 sums to 9 and fails.
The search returns side `2`.

## Complexity
Prefix construction takes O(RC) time and O(RC) space.
Each feasibility check scans O(RC) positions, so binary search gives O(RC log min(R,C)) time.
The Python implementation stores the full prefix matrix, and the Java implementation does the same.

## Edge cases
The threshold may be smaller than every cell, producing zero.
A single cell is checked directly by the same prefix formula.
When the entire matrix fits, the upper bound reaches `min(R,C)`.

## Common mistakes
The prefix rectangle formula must subtract both the top and left strips and add their overlap back.
A candidate side of zero should be treated as feasible so the binary search has a valid lower bound.
Scanning only squares from the origin misses lower or right-hand placements.

## Language notes
Python uses a nested `possible` helper and keeps the prefix rows as lists of integers.
Java uses an equivalent `hasValidSquare` helper and integer prefix sums under the local constraints.
