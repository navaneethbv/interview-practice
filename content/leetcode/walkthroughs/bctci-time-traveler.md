## Intuition

Every adjacent landing-year gap must be crossed either by aging or by one jump.
A jump saves exactly that gap's length, so the largest gaps provide the greatest savings for the limited jump budget.

## Brute force

Trying every subset of at most k gaps is combinatorial.
An exchange argument makes the optimal jump choices independent: replace any selected smaller gap with an unselected larger gap.

## Approach

Compute differences between consecutive points.
Sort the gaps and reserve the largest k for jumps.
Sum the remaining gaps as the minimum unavoidable aging.
Return whether that sum is at most maxAging.
Exchanging a smaller jumped gap with a larger unjumped gap never increases aging, so some optimum always uses the largest k gaps.
All gaps are nonnegative because landing years are sorted, and spending an available jump cannot worsen the result.

## Walkthrough

```text
Input: points = [2020, 2024], k = 0, maxAging = 3
Output: false
```

Example 1 contains only the gap from 2020 to 2024, whose length is four years.
With k equal to zero, no gap can be removed from the aging sum.
Minimum aging is therefore four.
Since maxAging is three, reaching the final landing year is impossible and the result is false.
The answer does not depend on the absolute calendar year, only on the four-year difference.

## Complexity

Computing and summing gaps takes O(n) time, while sorting takes O(n log n).
The gap array requires O(n) extra space.
The original landing-year list is not changed.

## Edge cases

With a jump for every gap, minimum aging is zero.
Exactly meeting maxAging is allowed.
Zero-length gaps, if present, provide no useful savings but need no special handling.

## Common mistakes

Do not jump the smallest gaps.
A jump covers only one adjacent gap, not an arbitrary interval spanning several landing points.

## Language notes

Python sorts descending and sums after the first k entries.
Java sorts ascending and sums the first number-of-gaps minus k entries, using long arithmetic for totals.
