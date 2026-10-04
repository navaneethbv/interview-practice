## Intuition

The promise of exactly one permanent overtake turns the comparison into a monotone predicate.
Before the crossing, player 1 is ahead; afterward, player 2 is ahead.
Binary search locates the boundary between those two regions without inspecting every second.

## Brute force

Scan from the first second until player 2's position exceeds player 1's position.
This costs O(n) time when the crossing is near the end.

## Approach

Initialize `low` at index zero, where player 1 is guaranteed ahead, and `high` at the final index, where player 2 is guaranteed ahead.
While more than one index separates them, inspect the midpoint.
If player 1 is still ahead there, move `low` to the midpoint.
Otherwise move `high` to the midpoint.
The endpoints preserve opposite sides of the crossing throughout the search.
When they become adjacent, no unexamined second remains between them, so `high` is the first index where player 2 leads.
The arrays' own increasing order is less important than the single-switch relationship between their corresponding entries.

## Walkthrough

Example 1 begins with low zero and high four.
At midpoint two, player 1 has position 6 and player 2 has position 5, so low becomes two.
At midpoint three, the positions are 8 and 9, so high becomes three.
The endpoints are now adjacent.
Returning high gives index 3, the first second when player 2 is ahead.

## Complexity

Each comparison roughly halves the remaining interval.
Both references run in O(log n) time and O(1) auxiliary space.
They do not create slices or recursively allocate subproblems.

## Edge cases

With two positions, the initial endpoints are already adjacent and the answer is one.
A crossing at the last position is handled by keeping the original high endpoint until the interval closes.

## Common mistakes

Do not return the last index where player 1 leads.
Binary search would be invalid if racers could overtake repeatedly, but the contract excludes that case.

## Language notes

Python uses integer floor division for the midpoint.
Java uses an unsigned shift on the nonnegative index sum; the stated array limit keeps that sum safely bounded.
