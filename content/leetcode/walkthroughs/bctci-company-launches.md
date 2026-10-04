## Intuition

Processing companies in launch order turns the earlier launch condition into a property of everything already seen.
Exactly one earlier spend exceeds the current spend precisely when it lies strictly between the largest and second largest earlier spends.

## Brute force

For each company, comparing its launch and advertising values against every other company takes O(n squared) time.
The two largest earlier spends summarize everything needed to decide whether the overshadowing count is exactly one.

## Approach

Sort original indices by `launches`.
Maintain `maximum` and `second`, initially -1 because valid spends are positive.
Before updating these values, append `index` if `second < value < maximum`.
Update the top two spends, then sort `answer` by original index.

## Walkthrough

Example 1 processes original indices 1, 2, then 0.
Spend 5 establishes the maximum.
Spend 3 lies between -1 and 5, so index 2 qualifies and becomes second.
Spend 4 lies between 3 and 5, so index 0 qualifies.
Sorting gives `[0, 2]`.

## Complexity

Sorting launch order and the final answer each take O(n log n) time in the worst case.
The scan itself takes O(n).
The index ordering and result require O(n) space; the two spend statistics need only constant space.

## Edge cases

The earliest company never qualifies because no earlier company exists.
Increasing advertising spend yields no overshadowed companies.
An empty input yields an empty answer.
Distinct launch days and distinct spends make strict comparisons sufficient without grouping equal values.

## Common mistakes

Test the company before adding its spend to the running statistics.
Do not return launch sorted indices because the contract asks for ascending original indices.
Keeping only the maximum cannot distinguish one larger predecessor from several larger predecessors.

## Language notes

Python sorts `range(len(launches))` with a key function and updates the top pair simultaneously.
Java sorts boxed indices with a comparator and performs the equivalent assignments explicitly.
Both retain original array indices throughout the computation.
