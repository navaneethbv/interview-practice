## Intuition
Changing one value can connect an arithmetic run on its left to one on its right, or extend a run from either side.
Precomputed left and right runs let each possible replacement be evaluated from its neighbors.

## Brute force
Trying every replacement value and rescanning the array can take O(N^2) or more.
The run tables summarize all unchanged arithmetic prefixes and suffixes in linear preprocessing.

## Approach
1. Build `leftRun` and `rightRun` lengths for every index.
2. Treat each index as the one value that may change.
3. Extend the left or right run by one, and when neighboring endpoints have an even difference, bridge both sides with their midpoint.
4. Keep the largest unchanged or changed run.

## Walkthrough
Example 1 is `[2,4,99,8,10]`.
The values around 99 are 4 and 8, whose difference is 4, so changing 99 to 6 creates the arithmetic sequence `[2,4,6,8,10]` with difference 2.
The left and right run tables provide the two values before and after the replaced index, yielding length 5.

## Complexity
Building both run arrays and checking every replacement take O(N) time.
The two arrays use O(N) auxiliary space.
The helper evaluates only neighboring runs and does not copy subsequences.

## Edge cases
Changing an endpoint can extend only one side.
An odd neighbor gap cannot have an integer midpoint and cannot bridge both sides.
An already arithmetic input is considered before any replacement and retains its full length.

## Common mistakes
Using the average of neighboring values without checking divisibility can invent a noninteger replacement.
Combining left and right runs with incompatible differences creates a false sequence.
Forgetting that only one index may change overcounts multiple repairs.

## Language notes
Python stores left and right lists and delegates each candidate to `_best_after_change`.
Java extracts preprocessing and candidate evaluation helpers to keep the public method below the cognitive-complexity limit.
