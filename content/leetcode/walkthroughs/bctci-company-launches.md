## Intuition

Process companies by launch date so all previously seen companies are exactly the possible overshadowers.
Only the largest and second-largest earlier advertising spends are needed to distinguish exactly one larger spend from zero or at least two.

## Brute force

Comparing every company with every other company takes O(n squared) time.
Counting all earlier larger spends is unnecessary once the two largest earlier values are known.

## Approach

Sort original indices by `launches`.
Before incorporating the current spend, test whether `second < value < maximum`.
If so, exactly the maximum earlier spend is larger, and the current original index qualifies.
Then update `maximum` and `second` to include this spend.
Sort the accumulated original indices before returning them.
Distinct launch days and distinct spends make the strict comparisons sufficient, without handling equal-date groups or repeated maxima.

## Walkthrough

```text
Input: [[3, 1, 2], [4, 5, 3]]
Output: [0, 2]
```

Example 1 processes original indices 1, 2, then 0 by launch day.
Index 1 has spend 5 and no earlier company, so it does not qualify.
Index 2 has spend 3, between the sentinel second value and maximum 5, so it qualifies.
Index 0 has spend 4, between second 3 and maximum 5, so it also qualifies.
Sorting selected indices produces `[0, 2]`.

## Complexity

Sorting dominates at O(n log n) time.
The order list and answer require O(n) extra space.
The scan itself stores only two spend summaries.

## Edge cases

An empty input returns an empty list.
The first company never qualifies.
Increasing spends produce no overshadowed companies.
A spend below the second-largest earlier spend has at least two overshadowers.

## Common mistakes

Update the maxima after testing; otherwise the company can interfere with its own comparison.
Return original indices, not positions in launch order.

## Language notes

Python sorts an index range using a key function.
Java sorts boxed indices with a comparator, preserving both input arrays while retaining their original indexing.
