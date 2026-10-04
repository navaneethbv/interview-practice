## Intuition

At any moment the smallest unconsumed front value among the three arrays is the next value in sorted order.
Since equal values become adjacent in this merge, comparing with the last output removes every duplicate without a separate set.

## Brute force

Concatenating all three arrays, sorting the result, and removing adjacent duplicates is easy to describe.
It costs O(n log n) time for n total input values and discards the sorted structure already provided.

## Approach

Keep one position for each array.
Inspect the available front of each array and choose the smallest pair of value and source index.
Advance only that source position.
Append the chosen value when merged is empty or its last value differs.
When no source has an unconsumed value, return the merged list.

## Walkthrough

In Example 1, the first fronts are 2, 3, and 3, so 2 is appended and arr1 advances.
The next fronts are 3, 3, and 3, so one 3 is appended.
Repeated 3 and 9 values are consumed one at a time, but each equal value is skipped after the first copy.
The remaining distinct values are appended in order, producing 2, 3, 4, 5, 7, 9.

## Complexity

If n is the sum of the three input lengths, every input value is inspected once.
The scan takes O(n) time and the output uses O(u) space for u distinct values.
The three front values and position array use constant auxiliary space.

## Edge cases

Any input array may be empty.
If all values are equal, the result contains one value.
Negative values and overlapping ranges require no special handling.
Three different arrays can expose the same value at the same step, and the last-value check still removes all copies.

## Common mistakes

Advancing all arrays that equal the minimum is unnecessary because later equal fronts will be skipped.
Appending every selected value would preserve duplicates.
Comparing against an arbitrary set without preserving the selected order can produce an unsorted result.

## Language notes

Python stores fronts as value and source pairs and uses min to select one.
Java scans the three sources explicitly and stores results in a List before converting to an int array.
Java's strict less-than tie test simply chooses one equal source because duplicate suppression makes the choice immaterial.
