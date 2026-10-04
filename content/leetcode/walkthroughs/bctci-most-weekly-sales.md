## Intuition

A week is exactly seven consecutive days, and adjacent weeks share six of those days.
The total changes only by the incoming day minus the outgoing day.
Keeping that running total makes it unnecessary to rescan each overlapping week.

## Brute force

Calculate each seven-day sum independently and retain the greatest.
Since seven is a fixed constant, that approach is also O(n), but it performs seven additions per window instead of reusing the previous total.
The sliding formulation also generalizes naturally to larger fixed window lengths.

## Approach

If fewer than seven days are supplied, return zero because no complete week exists.
Otherwise sum the first seven entries and initialize `best` to that value.
For every `day` beginning at index seven, add `sales[day]` and subtract `sales[day - 7]`.
The updated `window` now represents the seven days ending at that index.
Compare it with `best` and keep the larger sum.
Return the maximum sum itself, since this problem does not ask for a starting index.

## Walkthrough

Example 1's first seven-day total is 37.
Sliding forward produces successive totals 38, 35, 43, 43, 44, and 40.
The maximum 44 occurs in the window `[5, 0, 1, 0, 15, 12, 11]`.
When the final day replaces its outgoing value, the total falls to 40, so `best` remains 44.

## Complexity

Both references use O(n) time and O(1) auxiliary space.
Python creates a seven-element initialization slice, but its fixed size does not grow with the input.
Each later day requires constant arithmetic and one maximum comparison.

## Edge cases

Exactly seven days produces their sum without entering the sliding loop.
Fewer than seven days, including empty input, returns zero rather than a partial-week sum.

## Common mistakes

The outgoing index is seven positions behind the incoming day.
Do not accidentally evaluate six- or eight-day windows at the boundaries.

## Language notes

Python initializes with `sum(sales[:7])`; Java sums those entries explicitly.
Seven bounded daily sales counts fit comfortably in Java's `int`.
