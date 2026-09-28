## Intuition
After taking exactly k cards from the ends, the chosen cards consist of a prefix and a suffix.
Start with all k cards from the left, then replace one left card at a time with one more card from the right.
This visits every possible split without enumerating choices recursively.

## Brute force
There are k plus one possible counts of right-side cards, but choosing each split by summing its prefix and suffix from scratch costs O(k squared).
Updating the previous split in constant time gives a linear scan.

## Approach
1. Sum the first k cards and set that as the initial best score.
2. For each `takenRight` from 1 through k, add the next card from the right.
3. Remove the corresponding card that was previously taken from the left.
4. Update the maximum score after every split.

## Walkthrough
Example 1 is `[1, 2, 3, 4, 5, 6, 1]` with k equal to 3.
Taking the first three gives score 6.
Replacing 3 with the rightmost 1 gives 4, then replacing 2 with 6 gives 8.
Replacing 1 with 5 gives 12, representing the suffix `[5, 6, 1]`.
No other split improves 12, so the answer is 12.

## Complexity
The initial indexed sum and k replacements take O(k) time.
The method stores only the current and best scores, using O(1) auxiliary space.

## Edge cases
When k equals the array length, the only split selects every card.
When k is one, the scan compares the two ends.
Equal card values produce equal scores without needing special handling.

## Common mistakes
Taking arbitrary interior cards violates the end-selection rule.
Removing the wrong left index shifts the split and double-counts a card.
Checking only all-left and all-right choices misses mixed selections.

## Language notes
Python uses negative indexing for the card entering from the right.
Java computes the same indices from `cardPoints.length` and keeps sums in `int` under the stated limits.
Neither reference allocates a window or copies card ranges.
