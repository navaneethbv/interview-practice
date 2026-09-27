## Intuition

Only a subset sum's remainder modulo three matters for future choices.
Keep the greatest sum seen for each remainder and update all three states from the previous snapshot so one number is used at most once.

## Brute force

Enumerating all subsets takes `O(2^n)` time.
The three remainder states compress all subsets with the same future-relevant property.

## Approach

1. Initialize `best = [0, -inf, -inf]` for remainders 0, 1, and 2.
2. For each value, copy `best` to `following` to preserve the skip choice.
3. Update the remainder reached by adding the value to each reachable state.
4. Return `best[0]` after all values.

## Walkthrough
For Example 1, `nums = [3, 6, 5, 1, 8]`.
The states start as `[0, -inf, -inf]` for remainders 0, 1, and 2.
After 3 they are `[3, -inf, -inf]`, and after 6 they are `[9, -inf, -inf]`.
After 5, the states are `[9, -inf, 14]` because 9 plus 5 reaches remainder 2.
After 1 they become `[15, 10, 14]`, and after 8 they become `[18, 22, 23]`.
The remainder-zero state is 18, which is the returned maximum divisible sum.

## Complexity

Each value updates three remainder states, so time is `O(n)`.
The copied state array uses `O(1)` extra space.

## Edge cases

Negative infinity marks remainders that no subset can yet produce.
Skipping every value leaves sum zero, which is a valid divisible-by-three subset under the problem contract.

## Common mistakes

- Updating states in place can reuse the current value multiple times.
- Tracking only the largest total loses a smaller remainder that may combine better later.
- Returning the largest sum without checking remainder zero violates the requirement.

## Language notes

Python uses floating negative infinity as an unreachable sentinel, while Java guards `Integer.MIN_VALUE` before addition.
Both references keep exactly three DP states.
