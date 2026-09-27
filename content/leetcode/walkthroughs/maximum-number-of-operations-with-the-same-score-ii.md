## Intuition
The first operation fixes the score, and it can be one of only three boundary pairings.
After that choice, every operation removes either two values from the left, two from the right, or one from each side.
The remaining interval is therefore a compact dynamic-programming state.

## Brute force
A recursive search can try all three removals at every state, but repeated intervals are reached through different choices.
Without memoization the branching is exponential.
Memoizing `(left, right, score)` makes each interval for a fixed score solve once.

## Approach
1. Generate the three possible initial scores.
2. For each score, fill interval states `[left, right]` in increasing length.
3. Try the left pair, right pair, and outer pair whenever its sum equals the fixed score.
4. Add one operation to the already-computed smaller interval state for that removal.
5. Return the largest result across the initial scores.

## Walkthrough
Example 1 is `[1, 2, 1, 2]`.
The first possible score from the left pair is `1 + 2 = 3`.
For score 3, the length-two interval `[1, 2]` has one valid operation.
The length-four state considers removing its left pair and adds one to that stored length-two result.
It therefore records two operations, while the empty interval contributes zero as the base state.
The other initial pairings do not improve that count, so the answer is 2.

## Complexity
For one score there are O(N squared) interval states and constant branching per state.
Trying up to three scores keeps time O(N squared) and the bottom-up table at O(N squared) space.
The iterative fill uses O(1) stack space and avoids recursion depth growth.

## Edge cases
An array of length two can perform at most one operation.
Duplicate initial scores may be solved more than once, which is harmless.
An operation is allowed only when the chosen pair still lies inside the interval.

## Common mistakes
Allowing the score to change between operations violates the statement.
Memoizing only `(left, right)` mixes states with different target scores.
Forgetting the outer pairing misses valid sequences.

## Language notes
Python and Java fill an `N` by `N` interval table separately for each candidate score.
Both references use inclusive right endpoints and treat an interval with `left > right` as zero operations.
