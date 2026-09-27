## Intuition

Every value maps to the slot for that value.
Negating each mapped slot marks every number that appears.
Positive slots after marking correspond exactly to missing values.

## Brute force

A set of present values can find missing numbers in O(n) extra space.
Sorting and scanning also works but costs O(n log n).
Sign marking uses the input array as the presence table.

## Approach

1. For every value, take its absolute value and map it to an index.
2. Negate that slot while preserving a prior negative marker.
3. Scan slots after marking.
4. Append index plus one for every positive slot.
5. Return the missing values.

## Walkthrough

Example 1 marks indices for values 4,3,2,7,8,2,3,1.
After all marks, positions for 1,2,3,4,7,8 are negative.
Positions 5 and 6 remain positive.
The method returns [5,6].

## Complexity

The marking and result scans take O(n) time.
The algorithm uses O(1) auxiliary marking space and O(m) output space for m missing values.
It mutates nums through sign changes.
Each mapped index is valid because values lie from 1 through n.

## Edge cases

If every value appears, the result is empty.
If a value appears twice, its slot remains one negative marker.
A missing first value leaves index zero positive.
The input length determines the represented value range.

## Common mistakes

- Assigning negative nums[index] without abs can turn a prior negative back positive.
- Returning positive slots as zero-based indexes is off by one.
- Using a set consumes extra space unnecessarily.
- Reading values after mutation without abs maps negative indexes incorrectly.

## Language notes

Python builds the missing list with a comprehension after marking.
Java performs a separate loop and returns an ArrayList.
Both leave the input signs changed.
