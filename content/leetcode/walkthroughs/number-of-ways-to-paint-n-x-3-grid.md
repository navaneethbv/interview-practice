## Intuition

Every valid row of three cells has either two colors in an ABA pattern or three distinct colors.
The next row depends only on which pattern class the previous row belongs to, giving a two-state recurrence.

## Brute force

Enumerating all 3-color assignments for every cell is exponential in n.
Keeping only the two row-pattern counts compresses all compatible row details into constant state.

## Approach

1. For the first row, there are 6 two-color patterns and 6 three-color patterns.
2. For each following row, compute the next counts using `3*two + 2*three` and `2*two + 2*three`.
3. Reduce each state modulo 1000000007.
4. Return the sum of both pattern counts.

## Walkthrough

This is Example 1 from the local statement.
For `n = 1`, there are 6 ABA rows and 6 three-color rows.
Their sum is 12, so the method returns 12 without entering the transition loop.
For `n = 2`, applying the compatibility formulas produces 30 and 24, totaling 54 as in Example 2.

## Complexity

The loop runs once per additional row, so time is O(n).
Only two state values are kept, giving O(1) auxiliary space.

## Edge cases

One row uses the base count of 12.
The modulus must be applied after each transition.
Adjacent cells within a row and vertically adjacent cells are both represented by the pattern compatibility formulas.

## Common mistakes

Do not count only the row's internal color patterns; the previous row constrains the next row.
Keep the two state transitions separate because their compatibility counts differ.
Use a wide intermediate type in Java before applying the modulus.

## Language notes

Python updates temporary values before replacing the two states.
Java uses `long` state variables and returns the modular sum as an `int`.
