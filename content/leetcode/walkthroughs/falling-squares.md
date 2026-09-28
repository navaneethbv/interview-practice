## Intuition

Each new square rests on the tallest previously placed square that overlaps its open horizontal interval.
Because only up to 1000 squares are dropped, direct comparison with all earlier squares is simple and sufficient.

## Brute force

The reference is already the direct quadratic method: inspect every prior square for every drop.
A coordinate-compressed segment tree can improve asymptotic performance, but it adds complexity that the local bounds do not require.

## Approach

1. Represent every square by `[left, right, height]`, with `right = left + side`.
2. For a new square, treat two intervals as overlapping only when `max(lefts) < min(rights)`.
3. Set its base to the greatest overlapping height and add its side length.
4. Track the greatest height seen after each drop.

## Walkthrough

For Example 1, the drops are `[[1, 2], [2, 3], [6, 1]]`.
The first square occupies `[1, 3)` at height 2.
The second occupies `[2, 5)`, overlaps the first, and lands at height `2 + 3 = 5`.
The third occupies `[6, 7)`, touches no prior interval, and lands at height 1.
The running maxima are `[2, 5, 5]`.

## Complexity

For `q` squares, comparing each drop with all prior squares takes `O(q^2)` time.
The placed-square list and output use `O(q)` space.

## Edge cases

Intervals that share only an endpoint do not overlap because the comparison is strict.
A later square may land on a shorter overlapping square only when no taller overlap exists.

## Common mistakes

- Using `<=` treats edge touching as support and fails Example 2.
- Tracking the base from the first overlap instead of the maximum can bury a square inside a taller one.
- Returning each new height instead of the running maximum loses earlier towers.

## Language notes

Python stores tuples and uses explicit interval comparisons, while Java stores three integer fields in each array row.
The stated coordinate and side bounds keep `left + side` within Java `int` range.
