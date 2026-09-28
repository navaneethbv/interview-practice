## Intuition
The last run of a stable binary array determines whether adding a zero or one is legal.
Two tables count arrays ending in zero and one, while subtraction removes arrays whose final run would exceed `limit`.

## Brute force
Generating every binary arrangement with the required counts is exponential.
The ending-state dynamic program reuses counts for smaller zero and one totals.

## Approach
1. Initialize one-ending tables for runs of at most `limit` identical bits.
2. For each `(zeros,ones)`, sum arrays ending in zero from both previous ending states.
3. Subtract the table state that would append a run beyond the limit.
4. Apply the symmetric recurrence for arrays ending in one and sum the two final states modulo 1e9+7.

## Walkthrough
Example 1 has two zeros, one one, and limit 1.
The only valid arrangement is `010`, because the one cannot touch another one and the two zeros must be separated.
The ending-zero table counts `010`, while the ending-one table contributes no additional valid arrangement, so the answer is 1.

## Complexity
The two tables have `(zero+1)(one+1)` cells, each filled in O(1) time.
Time and auxiliary space are O(ZO), where Z and O are the requested zero and one counts.
The modulus keeps every stored value bounded.

## Edge cases
When one count is zero, only a single run is valid if its length is at most the limit.
A limit of one forces strict alternation.
The two ending states prevent counting the same arrangement twice.

## Common mistakes
Adding only arrays ending in the opposite bit misses shorter final runs of the same bit.
Subtracting the wrong index removes valid arrays instead of those with an overlong run.
Forgetting the final modulo can overflow language integers.

## Language notes
Python uses integer lists and normalizes each cell with `%`.
Java stores long table values and adds the modulus before taking the remainder after subtraction.
