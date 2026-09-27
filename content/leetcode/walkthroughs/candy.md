## Intuition

Each child starts with one candy.
The left-to-right pass handles every requirement where a child has a higher rating than the child immediately before it.
The right-to-left pass handles the opposite direction.
When both directions constrain one child, the larger requirement is necessary to satisfy both neighbors.

## Brute force

A direct method could start all counts at one and repeatedly increase a child that violates a neighbor comparison.
In a long increasing or decreasing run, one increase can create a new violation farther along the run.
Repeated rescans can therefore take O(n²) time.
The two directional passes propagate each one-sided requirement once.

## Approach

1. Create `candies` with one entry per rating, all initialized to one.
2. Scan left to right and increase the current count when the current rating is higher than the previous rating.
3. Scan right to left and increase the current count when the current rating is higher than the next rating.
4. Use `max` in the second pass so the right-side fix never discards a larger left-side requirement.
5. Sum the finalized counts.

## Walkthrough

For Example 1, ratings are `[1, 3, 2]`.
The first pass sees 3 greater than 1 and creates counts `[1, 2, 1]`.
The second pass sees 3 greater than 2 and confirms that its count must be at least 2.
The total is 4.
For Example 2, equal ratings never trigger either pass, so three children keep one candy each and the total is 3.

## Complexity

The two scans and final sum take O(n) time.
The `candies` array uses O(n) additional space.
The array is necessary because each child may need a count determined by both directions.

## Edge cases

A single child receives one candy.
Equal adjacent ratings impose no ordering requirement.
An increasing run receives counts that rise from left to right.
A decreasing run receives counts that rise from right to left.
A peak in the middle keeps the larger of its two one-sided requirements.

## Common mistakes

Do not overwrite the left-pass count blindly during the right pass.
Do not compare a child with every other child, since only immediate neighbors matter.
Do not give equal-rated neighbors an artificial ordering.
Do not initialize counts to zero, because every child must receive at least one candy.

## Language notes

Python uses list multiplication for the initial one-candy values and `sum` for the result.
Java fills an integer array with one before performing the same two passes.
Both versions keep the judge-required `candy` signature.
