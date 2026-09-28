## Intuition

Sorting each cuboid's dimensions removes rotation choices by making the smallest, middle, and largest dimensions canonical.
After sorting cuboids, a compatible predecessor can be placed below the current one, so longest-path dynamic programming maximizes total height.

## Brute force

Trying all rotations and stack orders multiplies rapidly.
Canonical dimensions and a sorted order reduce the problem to a cubic-style DP.

## Approach

1. Sort the three dimensions of every cuboid.
2. Sort cuboids lexicographically.
3. For each cuboid, start with its own largest dimension as height.
4. Extend from every earlier cuboid whose three dimensions fit.

## Walkthrough

For Example 1, normalized cuboids are `[1,2,3]` and `[2,3,4]`.
The first cuboid can sit on the second, so the DP height ending at the second is `4 + 3 = 7`.
The maximum is 7.

## Complexity

For c cuboids, normalization and sorting cost O(c log c), and the pairwise DP costs O(c²) time.
The DP array uses O(c) space.
Python's normalized list is a new O(c) collection; Java sorts each supplied cuboid and the outer array in place.

## Edge cases

Equal dimensions allow equal cuboids to stack.
A cuboid that fits no predecessor contributes only its own height.
All rotations are represented by the sorted orientation.

## Common mistakes

Compare all three dimensions.
Use the upper cuboid's height when adding a stack state.
Do not sort only the outer cuboid list without normalizing dimensions.

## Language notes

Python checks compatibility with `all` across three axes.
Java uses a `fits` helper and an `int[]` DP.
