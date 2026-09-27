## Intuition
A balanced result contains only a characters before any b characters.
When the next character is a, either delete that a or keep it and delete every earlier b.
Tracking the best deletion cost for the processed prefix makes these two choices sufficient.

## Brute force
Try each boundary between the final a region and b region.
For each boundary, rescan the string to count b characters before it and a characters after it.
This takes O(n^2) time with O(1) extra space.
The prefix recurrence computes the optimum without repeatedly counting either side.

## Approach
1. Initialize the number of seen b characters and the deletion cost to zero.
2. On b, increment the seen count; keeping a final b preserves balance in an already corrected prefix.
3. On a, set the deletion cost to the smaller of its previous value plus one and the number of seen b characters.
4. Return the final deletion cost.

The first candidate deletes the new a and retains the previous optimal corrected prefix.
The second keeps the new a, requiring every earlier b to be removed; all earlier a characters can then remain.
These exhaust the possibilities for the current character, so induction over prefixes proves the recurrence.
The b count includes all encountered b characters, independently of which deletions a previous optimal choice would have made.

## Walkthrough
Example 1 is `baba`.
The first b changes the seen count to one and leaves the cost zero.
The next a changes the cost to `min(0+1,1) = 1`.
The next b raises the seen count to two while the cost remains one.
The final a changes the cost to `min(1+1,2) = 2`.
The returned answer is 2; deleting both b characters is one valid optimal choice.

## Complexity
Each character contributes constant work, giving O(n) time.
The two counters require O(1) auxiliary space.
The implementations compute only the deletion count and do not build a corrected string.

## Edge cases
Strings containing only one character kind need no deletions.
An already ordered string such as aaabbb keeps cost zero.
A leading run of b characters is valid until later a characters create conflicting order.

## Common mistakes
- Requiring equal counts of a and b misinterprets the definition of balanced.
- Always deleting the latest a can miss a cheaper removal of earlier b characters.
- Resetting the seen-b count after a choice destroys information needed by later prefixes.

## Language notes
Python and Java use the same integer recurrence.
Java scans with `charAt`, avoiding a copied character array.
The count cannot exceed the input length, so integer arithmetic is sufficient.
