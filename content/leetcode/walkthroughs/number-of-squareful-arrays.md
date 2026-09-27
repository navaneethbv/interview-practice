## Intuition
A permutation is valid when each newly appended number forms a perfect-square sum with the previous number.
Count equal values as one candidate type so duplicate permutations are not counted repeatedly.

## Brute force
Generating all n! index permutations and checking adjacent sums is factorial time and stores a full permutation path.
The count map reduces duplicate branching, while backtracking still explores the distinct value arrangements required by the constraints.

## Approach
1. Count occurrences of each distinct value.
2. Precompute which distinct values have a square sum with each other value.
3. Backtrack by choosing an available compatible value and decrementing its count.
4. Restore the count after the recursive branch and count completed length-n paths.

## Walkthrough
Example 1 is `[1,17,8]`.
The squareful neighbor links include 1 to 8 because their sum is 9, and 8 to 17 because their sum is 25.
Starting with 1, the only valid continuation is 8, followed by 17, giving `[1,8,17]`.
Starting with 17, the matching continuation is 8 and then 1, giving `[17,8,1]`.
The other first choices cannot complete a valid arrangement, so the count is 2.

## Complexity
With n values and d distinct values, compatibility preprocessing costs O(d^2) square checks.
Each internal search node scans up to d candidate values, so a safe worst-case bound is O(d^2 + n * n!), reduced in practice by duplicate counts and compatibility pruning.
The counts, neighbor lists, and recursion path use O(d^2 + d + n) space.

## Edge cases
Equal values are chosen by count and therefore produce one distinct ordering.
A pair with a non-square sum cannot be adjacent.
A single value forms one valid permutation because it has no adjacent pair.

## Common mistakes
Counting indices instead of value counts duplicates equal permutations.
Using floating-point equality alone can misclassify a square near an integer boundary.
Forgetting to restore a count corrupts sibling recursion branches.

## Language notes
Python uses `math.isqrt` for exact square checks.
Java uses a `long` sum and compares the square of an integer square-root estimate without declaring new imports.
