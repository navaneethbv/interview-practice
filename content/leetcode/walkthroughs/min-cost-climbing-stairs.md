## Intuition

To reach a step, the climber must come from one of the previous two positions.
The cheapest cost to reach the current position therefore depends only on the two previous dynamic programming states.
The top is one position beyond the final cost entry, so it can be reached from either of the last two steps.

## Brute force

A recursive choice of one or two steps creates O(2^n) paths for n cost entries.
The two rolling dynamic-programming values reuse overlapping subproblems and reduce the work to O(n) time and O(1) auxiliary space.
## Approach

1. Set two_steps_back and one_step_back to zero for the virtual starting positions.
2. For each step from 2 through the cost length, calculate the cheaper route from one or two steps below.
3. Shift the two rolling states forward.
4. Return one_step_back for the top.

The loop computes the cost of reaching each position without storing the full table.
Starting either before step zero or before step one is represented by the two zero states.

## Walkthrough

Example 1 uses cost = [4, 7, 2].

| step | one-step route | two-step route | current |
| ---: | ---: | ---: | ---: |
| 2 | 0 + 7 = 7 | 0 + 4 = 4 | 4 |
| 3 | 4 + 2 = 6 | 0 + 7 = 7 | 6 |

The cheapest route pays 4 on step zero and 2 on step two, for a total of 6.

## Complexity

Let n be the number of cost entries.
The loop performs one constant amount of work per entry, so time is O(n).
Only two rolling values are stored, so auxiliary space is O(1).

## Edge cases

Two cost entries can be reached by choosing either starting step and returns the cheaper entry.
A large cost is still handled by the integer arithmetic under the problem bounds.
The final top is not charged separately.
The method never needs to mutate cost.

## Common mistakes

- Charging the top as if it were another cost entry adds a false fee.
- Allowing only one-step moves misses the required two-step option.
- Returning the cost of the final step instead of the top can be too large.
- Shifting rolling states in the wrong order loses the prior two-step value.

## Language notes

Python uses two named integers and tuple assignment for the shift.
Java assigns current, then moves oneStepBack into twoStepsBack.
Both use the same zero-cost virtual starting states.
