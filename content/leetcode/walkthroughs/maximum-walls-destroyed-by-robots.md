## Intuition
Sort robots by position and decide whether each robot fires left or right.
A dynamic program tracks the best score when the previous robot fires left or right, subtracting overlaps when two firing ranges cover the same walls.

## Brute force
Trying both directions for every robot costs O(2^n).
The sorted order means only adjacent robot directions can create a new overlap boundary.

## Approach
1. Pair and sort robot positions with distances.
2. Count walls at robot positions separately because they are always destroyed.
3. Sort remaining walls for binary-search range counts.
4. Initialize scores for the first robot firing left or right.
5. For each adjacent robot pair, count each new range and their overlap, then update both direction states.
6. Add the final robot's right range and take the better ending state.

## Walkthrough
For Example 1, one robot at 5 with distance 3 reaches walls 2 and 4 to the left or 6 and 7 to the right.
Either direction destroys two walls, so the answer is 2.
For Example 2, the robot at 2 blocks the shot from robot 1 before it reaches wall 10, so no wall is destroyed.

## Complexity
Sorting robots and walls costs O(n log n + w log w).
Each adjacent transition performs a constant number of binary-search range counts, so the DP scan costs O(n log w).
The sorted wall list and DP state use O(w+n) space.

## Edge cases
Walls at robot positions count once even if multiple shots would reach them.
An empty directional interval contributes zero.
The stop-at-robot rule is represented by using only adjacent boundaries.

## Common mistakes
Subtract walls in the overlap when both neighboring ranges destroy them.
Sort robot pairs together so distances stay attached to positions.
Do not count a wall at a robot position again in directional ranges.

## Language notes
Python uses `bisect` range counts.
Java uses a sorted primitive wall array and explicit lower-bound searches.
