## Intuition

The total vote count never changes, so a party wins exactly when its current votes exceed half of that total.
If nobody wins, the two smallest current parties form the cutoff, and every party tied with the second smallest joins that merge.
A min heap repeatedly exposes this required group.

## Brute force

Resorting all parties after every merge is correct but can add an avoidable logarithmic factor.
The heap keeps the smallest vote counts ordered while merged parties are reinserted.

## Approach

1. Build a min heap of `(votes, candidate)` pairs and compute `total`.
2. Check the initial parties for a strict majority.
3. Remove the two smallest parties and record the second vote count as `cutoff`.
4. Remove every remaining party whose votes equal `cutoff`.
5. Sum the merged votes and choose the candidate with greatest pre-merge votes, breaking ties lexicographically.
6. Return that candidate if the merged party wins, otherwise reinsert it and repeat.

## Walkthrough

Example 1 has total votes 9, so no initial party exceeds 4.5.
The heap removes Ada with 2 and Ben with 3, making 3 the cutoff and producing a merged party with 5 votes.
Ben had the greatest pre-merge count, and 5 is strictly more than half of 9.
The method therefore returns `"Ben"`.

## Complexity

- Time: O(p log p), because each of p parties is inserted and removed a bounded number of times.
- Space: O(p) for the heap and party data.

## Edge cases

A single candidate is returned even when its count is exactly the entire total.
An exact half is not a win because the rule is strictly greater than half.
All parties tied at the cutoff must be merged together.
Candidate tie breaking compares the original pre-merge vote counts before names.

## Common mistakes

- Merging only two parties misses ties at the second-smallest count.
- Choosing the lexicographically smallest name before comparing votes violates the leader rule.
- Using `>=` for the majority check changes ties into wins.
- Recomputing the total after merges makes the threshold drift incorrectly.

## Language notes

Python stores `(count, name)` tuples directly in `heapq`.
Java stores indices so vote and candidate arrays can be updated for a merged party.
Java uses `long` when multiplying votes by two to avoid integer overflow.
