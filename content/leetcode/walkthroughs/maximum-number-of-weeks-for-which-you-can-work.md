## Intuition
The largest project is the only possible source of adjacent equal weeks.
If all other milestones can separate its weeks, every week can be scheduled; otherwise the largest project leaves unavoidable adjacent repeats after the separators run out.

## Brute force
Trying project orders is factorial and adds no useful information beyond the largest count.
Counting separators yields a direct formula.

## Approach
1. Compute total milestones and the largest project count.
2. The other projects provide `total - largest` separators.
3. If separators are enough, return total; otherwise return twice the separator count plus one.
4. Express both cases as `min(total, 2*(total-largest)+1)`.

## Walkthrough
Example 1 has milestones `[1,2,3]`, total 6, and largest count 3.
The other projects provide three separator weeks, so the six weeks can alternate without repeating a project consecutively.
The formula gives `min(6, 2*3 + 1) = 6`.

## Complexity
The totals are computed in O(N) time and O(1) auxiliary space.
The Java reference uses long counters to preserve the total under the local bounds.

## Edge cases
One project returns its milestone count because no other project can separate it, but the formula caps it at one when needed.
Equal largest counts are handled by choosing either maximum.
Zero is not a valid milestone count under the local positive-input contract.

## Common mistakes
Returning total whenever there is more than one project ignores an overwhelming largest project.
Subtracting one from the largest count instead of using all other milestones miscounts separators.
Sorting is unnecessary because only the maximum and total matter.

## Language notes
Python uses `sum` and `max` over the input list.
Java accumulates both quantities in `long` and evaluates the same minimum formula.
