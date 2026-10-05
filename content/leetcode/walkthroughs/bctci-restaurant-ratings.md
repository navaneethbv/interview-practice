## Intuition

At each restaurant, the optimal plan either skips it or visits it and therefore skips its immediate predecessor.
Only the best totals for the previous two prefixes are needed.
This turns the nonadjacent-choice problem into a constant-space dynamic program.

## Brute force

Enumerate subsets of stops, reject adjacent selections, and keep the largest total rating.
The number of possible subsets is exponential in the route length.

## Approach

Before each iteration, `with_best` is the optimum for the processed prefix, and `without_last` is the optimum for that prefix without its final position.
For the next rating, skipping keeps `with_best`.
Taking it yields `without_last + rating`.
Set the new best to the larger candidate, while shifting the old best into `without_last` for the next step.
The two cases cover every valid plan, and the take case cannot introduce adjacent stops because it uses the shorter prefix.

## Walkthrough

Example 1 uses `[8, 1, 3, 9, 5, 2, 1]`.
The best prefix totals progress as 8, 8, 11, 17, 17, 19, and 19.
At rating 9, visiting it can combine with the earlier total 8, improving the answer to 17.
At rating 2, combining with that 17 gives 19.
One optimal selection is indices 0, 3, and 5, whose ratings sum to `8 + 9 + 2 = 19`.

## Complexity

The scan takes O(n) time and O(1) auxiliary space.
The method returns the maximum sum only, so it does not retain choices for reconstruction.

## Edge cases

An empty route returns 0.0.
A single restaurant returns its nonnegative rating, and zero-rated restaurants never force a worse solution.

## Common mistakes

Do not overwrite the previous best before computing the take candidate.
Choosing the larger member of each adjacent pair greedily can miss globally better combinations.

## Language notes

Python's tuple assignment evaluates both right-hand expressions before updating either variable.
Java uses a temporary `next` value to preserve the same update semantics with doubles.
