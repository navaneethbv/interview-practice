## Intuition
For positive k, each distinct number can start at most one pair with its value plus k.
For k zero, a pair requires two copies of the same value, so frequencies are needed.

## Brute force
Checking every index pair takes O(n^2) time and then deduplicating value pairs requires another set.
The pair set uses O(n^2) worst-case space in an unconstrained result representation.
A frequency map avoids examining all index pairs.

## Approach
1. Build a frequency map.
2. If k is zero, count values with frequency greater than one.
3. Otherwise count keys for which `value + k` is another key.

## Walkthrough
Example 1 is `nums = [1, 3, 1, 5]` and `k = 2`.
The frequency map records one twice, three once, and five once.
For value 1, value 3 exists, so one distinct pair is counted.
For value 3, value 5 exists, so a second pair is counted.
For value 5, value 7 is absent.
The result is 2.

## Complexity
Building the map and scanning its K distinct keys takes O(n) expected time.
The map uses O(K) auxiliary space.
Python and Java hash tables have the same expected complexity under normal hashing.

## Edge cases
When k is zero, duplicate values count once rather than once per duplicate pair.
A negative k has no valid absolute difference under the local nonnegative contract.
A one-element input cannot form a pair with itself.

## Common mistakes
Counting index pairs overcounts duplicates.
Using the zero case with `value + 0` incorrectly counts every distinct value.
Sorting and adjacent scanning is valid but costs O(n log n) instead of expected linear time.

## Language notes
Python's dictionary stores integer frequencies.
Java uses `HashMap<Integer, Integer>` and checks keys without sorting or copying the input array.
