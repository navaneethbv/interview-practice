## Intuition

The best route to an index must arrive from one of the previous `k` indices.
What matters about a predecessor is its best accumulated score, not its original array value.
Maintain the maximum predecessor score as the allowed window slides forward.

## Brute force

Dynamic programming can store the best score at every index and scan up to `k` predecessors for each new index.
The recurrence is `dp[i] = nums[i] + max(dp[j])` over valid predecessor indices.
This takes `O(nk)` time and `O(n)` space.
It is useful for checking the optimized algorithm on small random arrays.

## Approach

Keep a deque named `best` of index/score pairs, ordered by increasing index and decreasing score.
Initialize it with index zero and score `nums[0]`.
Before evaluating a new index, remove front entries whose indices are less than `index - k`.
The remaining front contains the highest usable predecessor score.
Add `nums[index]` to obtain `score`.

Before appending the new pair, remove back entries with scores less than or equal to the new score.
The new entry dominates those candidates: it has an equal or better score and expires later.
Append the new pair and continue.
The current `score` at the last index is the required answer.
Keeping pairs directly avoids storing a separate score for every array position.

## Walkthrough

For Example 1, `nums = [1, -1, -2, 4, -7, 3]` and `k = 2`.
The best accumulated scores at successive indices are `1, 0, -1, 4, -3, 7`.
At index three, index zero has expired, so the predecessor score is zero from index one.
Adding four produces score four, which dominates older smaller candidates.
At the last index, score four from index three remains available.
Adding three gives seven, achieved by indices zero, one, three, and five.

## Complexity

Each pair enters the deque once and leaves it at most once.
The total time is `O(n)`.
At most `k + 1` pairs can be present immediately after insertion, so auxiliary space is `O(k)`.

## Edge cases

A single-element array returns that element, even if it is negative.
When `k` is one, every index must be visited.
Negative values do not allow restarting the route: index zero remains the required start.
A large jump limit may skip several unfavorable values but never the final index.

## Common mistakes

Comparing original array values instead of accumulated scores chooses the wrong predecessor.
Expiring the index equal to `index - k` discards a still-legal jump.
Returning the maximum score seen anywhere fails when the final value is negative.

## Language notes

Python uses `collections.deque` for constant-time operations at both ends.
Java uses `ArrayDeque<int[]>` to store index/score pairs.
The largest possible absolute route sum under these constraints fits in a signed Java integer.
