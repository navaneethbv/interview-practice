## Intuition
The best way to paint a prefix of houses ending with each color is enough information for the next house.
The previous house cannot use the same color, so each new color adds the cheaper of the other two prefix costs.

## Brute force
Enumerating all three choices for every house takes O(3^N) time.
The three-state dynamic program keeps only the best prefix cost for each final color.

## Approach
1. Start all three previous-color costs at zero before any house is painted.
2. For each row, compute three next costs by adding its color price to the cheaper different-color previous cost.
3. Replace the previous costs with the new row's costs.
4. Return the minimum of the three costs after the final house.

## Walkthrough
Example 1 has costs `[[17,2,17],[16,16,5],[14,3,19]]`.
After the first house the costs are `[17,2,17]`.
For the second house they become `[18,33,7]`, because red uses the prior blue cost 2, blue uses the prior red cost 17, and green uses the prior blue cost 2.
The third row gives `[21,10,37]`, so the minimum total is 10.

## Complexity
Each house computes three states, giving O(N) time.
Only two arrays of three costs are live, so auxiliary space is O(1).

## Edge cases
One house returns its cheapest color directly.
An empty cost list retains the initial zero costs and returns zero under the local contract.
Equal prices are allowed because only the color identity of adjacent houses matters.

## Common mistakes
Using the minimum previous cost without excluding the same color permits adjacent houses to share a color.
Updating the three states in place can make one color depend on the current row rather than the previous row.
Returning the last row's first color ignores cheaper final colors.

## Language notes
Python builds a fresh three-element list for each row using named color variables.
Java explicitly allocates the next three-element array and returns a nested `Math.min` expression.
