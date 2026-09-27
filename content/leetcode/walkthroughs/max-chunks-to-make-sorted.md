## Intuition
A prefix can form a chunk exactly when its largest value equals the final index of that prefix.
Then every value in the prefix belongs there, and the remaining values can be sorted independently.

## Brute force
A naive method tries every partition and sorts each proposed chunk before comparing the concatenation.
There are O(2^(n-1)) partitions and repeated sorting can make the search exponential.
The prefix maximum identifies all valid cut points in one pass.

## Approach
1. Track the largest value seen through each index.
2. Whenever it equals the current index, close one chunk.
3. Return the number of cuts.

## Walkthrough
Example 1 is `[1, 0, 2, 3]`.
At index 0 the maximum is 1, so no cut is possible.
At index 1 the maximum remains 1, matching the index, so the first chunk is `[1,0]`.
At index 2 the maximum is 2, so the second chunk can end there immediately.
At index 3 the maximum is 3, giving the third chunk `[3]`.
The answer is 3.

## Complexity
The scan takes O(n) time and O(1) auxiliary space.
The returned count uses one integer.
The local contract contains a permutation of zero through n minus one, which makes the index comparison valid.

## Edge cases
A sorted array can split at every index.
A reverse array has only one chunk.
A value that belongs to an earlier position keeps the maximum above the current index and delays a cut.

## Common mistakes
Counting a cut whenever the current value equals the index ignores earlier displaced values.
Sorting each chunk is unnecessary and obscures the invariant.
This argument does not directly apply to arbitrary arrays with duplicates.

## Language notes
Python tracks an integer maximum without modifying the input list.
Java performs the same indexed scan over the original array.
