## Intuition

English number names repeat the same rules for each three-digit group.
Convert each nonzero group and attach its scale such as Thousand or Million.

## Brute force

Handling every nonnegative signed integer with a giant lookup table is impractical for more than two billion possible inputs.
Manual case handling at the full number level also repeats the same hundreds and tens rules.

## Approach

1. Split the number into groups of three from right to left.
2. Convert each group below one thousand.
3. Attach the group scale when the group is nonzero.
4. Reverse the collected group phrases and join them with spaces.

## Walkthrough

Example 1:

For 42, the only group is 42.
The below-thousand helper combines Forty and Two, returning Forty Two.

## Complexity

At most four three-digit groups are processed, so time and auxiliary phrase work are O(1) for the fixed integer bound.
The returned string uses O(W) space for W output characters.
Python and Java both recurse only within a three-digit group, so recursion depth is at most two.

## Edge cases

Zero returns Zero directly.
Zero groups between nonzero scales are omitted.
Numbers ending in zero do not receive an extra trailing space.

## Common mistakes

Do not say Zero for an omitted internal group.
Keep scale order from Billion down to the units group.
Use Hundred only when the group contains a nonzero hundreds digit.

## Language notes

Python stores scale phrases in a list and reverses groups.
Java uses static word arrays and joins the reversed group list.
