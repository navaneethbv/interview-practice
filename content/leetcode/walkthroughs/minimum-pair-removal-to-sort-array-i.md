## Intuition
At each step the allowed operation chooses the adjacent pair with the smallest sum, breaking ties by the leftmost pair.
After replacing that pair with its sum, repeat until the live sequence is nondecreasing.

## Brute force
The direct simulation scans all adjacent pairs after every merge, requiring O(N^2) time in the worst case.
That is suitable for this variant's small bound and makes the tie rule explicit.

## Approach
1. Copy the values into a mutable list.
2. Find the smallest adjacent sum and remember its left index.
3. Replace that pair with the sum and remove the right element.
4. Count the operation and stop when every adjacent pair is ordered.

## Walkthrough
Example 1 starts with `[4,1,2]`.
The adjacent sums are 5 and 3, so merge `1 + 2` to obtain `[4,3]`.
The only pair is now an inversion, so merge `4 + 3` to obtain `[7]`.
Two operations are required, matching the returned answer.

## Complexity
There are at most N minus one merges, and each pass scans the current list, so the time is O(N^2).
The Python list copy and Java mutable array/list representation use O(N) auxiliary space.

## Edge cases
An already nondecreasing list returns zero without changing values.
With one element there is no adjacent pair and the list is already sorted.
Equal adjacent values are ordered and do not require a merge.

## Common mistakes
Choosing the first inversion instead of the smallest sum violates the operation rule.
For equal sums, selecting the rightmost pair changes later merges and can change the answer.
Checking sortedness before each merge must include the newly formed pair at both boundaries.

## Language notes
Python removes the right item with `pop` after replacing the left value.
Java uses an `ArrayList<Integer>` and performs the same leftmost minimum scan.
