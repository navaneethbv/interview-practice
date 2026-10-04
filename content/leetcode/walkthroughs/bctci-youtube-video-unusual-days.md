## Intuition

After sorting reception scores, every score to the left is no larger and every score to the right is no smaller.
Absolute differences can then be replaced by two simple sum formulas.

## Brute force

Computing every day's deviation by comparing it with every other day takes O(n squared) time.
Sorting lets prefix totals reuse the same accumulated scores for all candidates.

## Approach

Build and sort scores as likes minus dislikes.
Compute total and maintain below, the sum strictly before the current index.
The lower-side contribution is `score * index - below`.
The upper-side sum is total minus below minus score, giving contribution `above - score * remaining_count`.
Add both contributions, update best, then include the current score in below.
Sorting does not change any total deviation because it only rearranges the same comparison scores.

## Walkthrough

```text
Input: likes = [3, 6, 1], dislikes = [0, 1, 9]
Output: 24
```

Example 1 produces scores 3, 5, and -8, sorted as `[-8, 3, 5]`.
For -8, the absolute differences are 11 and 13, totaling 24.
For 3, they are 11 and 2, totaling 13.
For 5, they are 13 and 2, totaling 15.
The maximum is 24, belonging to the original day with score -8.

## Complexity

Sorting takes O(n log n) time and the subsequent scan O(n).
The score array requires O(n) extra space.
The reference scans every score, even though alternative approaches can exploit additional convexity properties.

## Edge cases

No days and one day both return zero.
Equal scores contribute zero differences between them.
Negative scores remain valid and are ordered normally.

## Common mistakes

Do not take one absolute value after summing signed differences; cancellation changes the answer.
Update below after calculating the current deviation so the current score is excluded.

## Language notes

Python integer sums are unbounded.
Java uses long scores and totals, ensuring products of a score with the number of days are evaluated with wide arithmetic.
