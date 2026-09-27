## Intuition

Keep the smallest possible first value and the smallest possible second value for an increasing subsequence seen so far.
A smaller first value is always at least as useful for future elements.
When a value exceeds the stored second value, it completes a triplet in index order.
Replacing a value with an equal or smaller candidate preserves the possibility of completion without accepting duplicates.

## Brute force

A direct solution could try every triple of indices and compare their values.
That takes O(n³) time.
Dynamic programming can reduce this to O(n²), but the two candidate values are enough because only lengths one and two need to be represented.

## Approach

1. Initialize first and second to positive infinity.
2. For each value, replace first when the value is no larger than it.
3. Otherwise replace second when the value is no larger than second.
4. Otherwise the value is larger than both in the correct order, so return true.
5. If the scan ends, no increasing triplet exists.

## Walkthrough

For Example 1, nums is [5,1,4,2,3].
The first value sets first to 5, then 1 replaces it.
Value 4 becomes second because it is greater than first.
Value 2 improves second to 2.
Value 3 exceeds both 1 and 2, so the method returns true for 1,2,3.
For Example 2, each value replaces first and second never becomes a usable lower pair, so the result is false.

## Complexity

The scan takes O(n) time.
Only first and second are stored, so extra space is O(1).
The Java long sentinels allow every signed int input to be compared safely.

## Edge cases

Fewer than three elements return false.
Equal values do not form a strict increase.
Negative and extreme signed values are handled by ordinary comparisons.
A triplet may use nonadjacent positions.

## Common mistakes

Do not use less-than when updating first or second, because equal values can improve a candidate without forming a triplet.
Do not reset second when first decreases.
Do not require the three values to be adjacent.
Do not sort the input, because index order defines a subsequence.

## Language notes

Python uses positive infinity as the initial sentinel.
Java uses Long.MAX_VALUE so it safely exceeds every signed int.
Both methods return immediately when a third strictly larger value appears.
