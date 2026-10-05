## Intuition

First convert each day into its reception score, likes minus dislikes.
After sorting the scores, every score to the left is no larger and every score to the right is no smaller.
Prefix sums then calculate all absolute differences for a score in constant time.

## Brute force

Computing each day's distance from every other day takes O(n squared) time.
That repeats the same pairwise difference in both directions.

## Approach

Build and sort the scores.
Maintain below, the sum of scores before the current index, and total, the sum of all scores.
The contribution from lower scores is score times index minus below.
The contribution from higher scores uses above, which is total minus below minus score, minus score times the number of higher entries.
Take the largest deviation over the sorted scan.

## Walkthrough

In Example 1, the scores are 3, 5, and negative 8, which sort as negative 8, 3, 5.
For negative 8, there are no lower scores and the higher contribution is 3 minus negative 8 plus 5 minus negative 8, giving 24.
The other scores have smaller totals, so best remains 24.

## Complexity

Creating the scores takes O(n) time and sorting takes O(n log n) time.
The prefix scan is O(n), so the total time is O(n log n).
The sorted score array uses O(n) space.

## Edge cases

An empty input has no score and returns zero.
A single day has no pairwise differences and returns zero.
Equal scores contribute zero to one another.
Java uses long arithmetic because summed scores and deviations can exceed int range.

## Common mistakes

Using likes alone ignores dislikes and changes the definition of unusualness.
Subtracting the current score from total twice corrupts the higher-side sum.
Sorting after calculating prefix positions makes the side counts meaningless.

## Language notes

Python uses a generator to build scores and ordinary integer arithmetic.
Java stores scores and running sums as long values before sorting.
Both references evaluate the same lower and higher formulas at each sorted index.
