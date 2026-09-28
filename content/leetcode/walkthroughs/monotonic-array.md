## Intuition
An array is monotonic if it never decreases or never increases.
Two flags can track both possibilities in one pass, and either surviving flag proves the result.

## Brute force
Checking the array separately for nondecreasing and nonincreasing order scans it twice, still O(N) time.
The combined scan shares each comparison.

## Approach
1. Initialize `nondecreasing` and `nonincreasing` to true.
2. For each adjacent pair, clear the first flag if the current value is smaller.
3. Clear the second flag if the current value is larger.
4. Return the OR of the flags.

## Walkthrough
Example 1 is `[1,2,2,3]`.
The comparisons `1 <= 2`, `2 <= 2`, and `2 <= 3` preserve the nondecreasing flag.
The comparison `1 >= 2` clears the nonincreasing flag immediately, but the first flag remains true.
The result is true.

## Complexity
The adjacent pairs are inspected once, so the time is O(N).
The two booleans and loop variables use O(1) auxiliary space.

## Edge cases
Equal adjacent values preserve both flags.
An array of one value satisfies both monotonic directions.
Example 2 `[1,3,2]` clears both flags at different comparisons and returns false.
An array that changes direction only after a long equal plateau is still rejected when the first opposite comparison appears.

## Common mistakes
Strict comparisons incorrectly reject valid plateaus.
Returning false as soon as one direction fails misses the other direction.
Checking only the first and last values cannot detect an interior reversal.
The flags describe the whole adjacent comparison sequence, so no separate sorted copy is needed.

## Language notes
Python updates booleans with comparisons over adjacent values.
Java uses boolean compound assignment and keeps the input array unchanged.
