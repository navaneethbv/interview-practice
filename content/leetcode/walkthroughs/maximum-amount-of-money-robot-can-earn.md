## Intuition
The state at a cell depends on how many negative values have been neutralized so far.
For each state, retain the best total arriving from above or left, then choose whether to collect or neutralize a negative cell.

## Brute force
Enumerating every path and every neutralization choice is exponential.
A three-state grid dynamic program captures the bounded two-use resource.

## Approach
1. Define `dp[row][column][used]` as the best total with `used` neutralizations at the cell.
2. Take the best matching state from above and left.
3. Add the current value normally.
4. If the value is negative and fewer than two uses are spent, also carry the previous total into state `used + 1` without adding the loss.
5. Return the best of the three destination states.

## Walkthrough
For Example 1, moving down and right collects 1, 2, and 3 for total 6, so no neutralization is needed.
For `[-4,-3,-2]`, the robot can neutralize -4 and -3, then must collect -2, giving -2.
The DP keeps those alternatives separately and chooses the best destination state.

## Complexity
For an R by C grid and three usage states, time is O(RC) and auxiliary DP space is O(RC).
The fixed state dimension contributes only a constant factor.

## Edge cases
Neutralizing a positive value is never needed and is disallowed by the transition.
The final answer can remain negative when all paths lose money.
Endpoints may be neutralized when negative.

## Common mistakes
Do not spend a neutralization on a zero or positive cell.
Keep states separate by the exact number of uses.
Use a sufficiently small negative sentinel that cannot be confused with a valid total.

## Language notes
Python uses a large negative sentinel and nested lists.
Java fills a three-dimensional array with a negative sentinel and uses integer totals under the constraints.
