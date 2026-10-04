## Intuition

Every route to stair n ends with a step of length one, two, or three.
Removing that final step leaves a route to one of the previous three stairs.
These possibilities are disjoint, so their counts add together.
Only those three recent counts need to be retained.

## Brute force

Recursively branch on every possible next step until the destination is reached.
Many branches solve the same remaining-distance problem, and the number of calls grows exponentially without memoization.

## Approach

Initialize `three_below` and `two_below` to zero and `one_below` to one.
The one represents the single empty route to stair zero; negative stairs have zero routes.
For every next stair, calculate the sum of the three stored values modulo `MOD`.
Shift the rolling state so the new `current` becomes `one_below`.
After n updates, return `one_below`.
The recurrence counts step order: taking one then two is different from taking two then one.

## Walkthrough

Example 1 asks for n equal to 3.
Starting from `(0, 0, 1)`, the first update produces one route to stair 1.
The second produces two routes to stair 2.
The third adds counts 1, 1, and 2 to produce 4.
The routes are `1+1+1`, `1+2`, `2+1`, and `3`, matching the statement.

## Complexity

Time is O(n), with one constant-size update per stair.
Auxiliary space is O(1), because previous counts are overwritten after their final use.
Modulo arithmetic keeps stored values bounded.

## Edge cases

For n equal to zero, the loop does not execute and returns one.
For n equal to one or two, the zero counts for negative stairs make the same recurrence work.

## Common mistakes

Initializing the zero-stair count to zero would force every later count to zero.
Updating rolling variables individually in the wrong order loses needed old values.

## Language notes

Python uses simultaneous assignment for the state shift.
Java computes the sum in long variables so adding three residues cannot overflow a signed int before the modulo operation.
