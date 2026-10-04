## Intuition

The exact number of balls quickly becomes irrelevant; what matters is which colors exist and whether a present color has a spare ball.
Combining equal colors can reduce an arbitrarily large pile to one representative without introducing another color.
Combining two different colors introduces the missing third color.
These observations reduce the search to three small cases.

## Brute force

Enumerate every pair of colors, apply the operation, and recursively collect terminal colors.
This repeats many count states and cannot handle counts approaching a billion.

## Approach

The references arrange `counts` in B, G, R order so appending valid choices automatically produces alphabetical output.
With one present color, only that color survives.
With all three present, any chosen final color is attainable by first reducing each pile and choosing the final combinations appropriately.
With exactly two present colors, the absent color is always attainable by reducing the piles and combining their representatives.
A present candidate is attainable only if the other present color has at least two balls, allowing an intermediate third color while retaining another ball of that other color.
Test that condition independently for each candidate.

## Walkthrough

Example 1 has two red balls, one green ball, and no blue balls.
Blue is attainable: combine the two reds into red, then red and green into blue.
Green is attainable: combine one red and green into blue, then blue with the remaining red into green.
Red is impossible because green has no spare ball.
The answer is `BG`.

## Complexity

Both references take O(1) time and O(1) space.
They inspect three counters without simulating individual balls.

## Edge cases

A single initial ball is already the answer.
Two singleton piles can produce only the missing color.

## Common mistakes

Do not use parity alone: equal-color operations also change counts.
Input argument order is R, G, B, whereas output order is B, G, R.

## Language notes

Python builds `present` explicitly; Java counts present colors and remembers their index.
Both use bounded integer comparisons, so no sum of the three large counts is required.
