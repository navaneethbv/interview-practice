## Intuition

Sorted order lets us eliminate one endpoint after every unsuccessful comparison.
The smallest and largest remaining values determine whether the current sum needs to increase or decrease.

## Brute force

Checking every pair of distinct positions takes O(n squared) time.
A set can detect complements in linear time, but the sorted input allows the same time bound without storing values.

## Approach

Set `left` to the first index and `right` to the last.
While `left < right`, compute their sum.
Return true if it is zero.
If it is positive, decrement `right`: pairing that largest value with any other remaining value cannot produce a smaller sum than the one just checked.
If it is negative, increment `left` by the symmetric argument.
When the pointers meet, every feasible pair has been checked or safely excluded.

## Walkthrough

```text
Input: arr = [-5, -2, -1, 1, 1, 10]
Output: true
```

The endpoints -5 and 10 total 5, so the right pointer moves to the last 1.
Now -5 + 1 is negative, so the left pointer advances through -2 to -1.
The pair -1 and 1 totals zero, and the reference returns true.
The two occurrences of 1 do not need special handling because the result only asks whether a pair exists.

## Complexity

Each iteration moves at least one pointer inward, giving O(n) time.
Only indices and the current sum are stored, so extra space is O(1).

## Edge cases

Empty arrays and singleton arrays return false.
A single zero cannot pair with itself, while two zeros can form a valid pair.
All-positive or all-negative arrays exhaust the search without a match.

## Common mistakes

Using `left <= right` incorrectly permits reusing one position.
Moving the left pointer after a positive sum discards the wrong candidates.

## Language notes

Python integers safely hold the sum.
Java promotes one operand to `long` before addition, keeping arithmetic safe when adapting the method to larger integer ranges.
