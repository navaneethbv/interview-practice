## Intuition

For a subarray ending after the current value x, a valid first value is x-k or x+k.
The best sum for that endpoint uses the smallest prefix sum recorded immediately before an occurrence of that start value.

## Brute force

Checking every subarray is O(n²).
Prefix sums plus a map of minimum preceding prefixes reduce each endpoint to two lookups.

## Approach

1. Before extending the prefix, record the smallest prefix seen at each current value.
2. Add the current value to the running prefix.
3. Look up values `current-k` and `current+k` as possible subarray starts.
4. Maximize the resulting prefix differences, returning zero if no valid endpoint pair exists.

## Walkthrough

For Example 1, `[1,2,3,4]` and k=3.
When value 4 is processed, value 1 is already mapped to prefix 0.
The current prefix is 10, so the candidate sum is `10 - 0 = 10`, representing the whole array.
No larger valid sum exists, so the result is 10.

## Complexity

The map operations make expected time O(n) and space O(u), where u is the number of distinct values.
Python stores arbitrary-size prefix integers; Java uses `long` prefixes and answer values.
The input arrays are scanned without sorting or copying.

## Edge cases

Negative sums are valid and must be compared when every candidate is negative.
Repeated starting values require the minimum preceding prefix, not the latest one.
If no pair differs by k, return zero.

## Common mistakes

Record a value before adding the current element so the subarray can start here.
Check both endpoint directions.
Do not discard negative candidate sums before determining whether any valid subarray exists.

## Language notes

Python uses `None` to distinguish no candidate from a negative answer.
Java uses `Long.MIN_VALUE` as that sentinel.
