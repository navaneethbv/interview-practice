## Intuition

Large counts make simulating every merging order impossible.
Only which colors are present and whether a present color has at least two balls affect attainability.
Equal-color merges can reduce a color's count while preserving that color, enabling small representative constructions.

## Brute force

Explore every legal pair choice recursively until one ball remains.
The number of sequences grows rapidly with the total number of balls, which can be billions here.

## Approach

Store counts in alphabetical output order as `[B, G, R]`.
If only one color is present, all merges preserve it.
If all three are present, any final color is possible: reduce each color to one ball, combine the other two into the target color, then merge the two target balls.
For exactly two present colors, the absent color is always attainable by reducing both to singletons and combining them.
A present target color is attainable precisely when the other present color has at least two balls.
Keep two of that other color, use one with the target to create the third color, then combine that third color with the remaining other ball.

## Walkthrough

Example 1 has `R = 2`, `G = 1`, and `B = 0`.
Blue is attainable by merging the two reds into red, then red with green into blue.
Green is attainable by merging one red with green into blue, then blue with the remaining red into green.
Red is not attainable because green has only one ball.
In alphabetical order, the answer is `BG`.

## Complexity

The algorithm examines only three counts and a constant number of color pairs.
Time and auxiliary space are O(1), independent of the total ball count.

## Edge cases

A single existing ball simply keeps its color.
Two different singleton colors can yield only the missing third color.

## Common mistakes

Parity is not the deciding invariant because equal-color merges alter counts by one.
Return all attainable colors, not just one feasible merging outcome.

## Language notes

Both implementations avoid summing all counts, so even their large combined total causes no Java integer overflow.
They append colors in B, G, R order.
