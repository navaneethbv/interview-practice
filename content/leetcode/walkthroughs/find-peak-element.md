## Intuition

Look at the slope between the middle element and its right neighbor.
If the slope rises, a peak must exist to the right because the array cannot rise forever past its boundary without ending at a peak.
If the slope falls, the middle element or an element to its left contains a peak.
This lets binary search discard half the candidates after each comparison.

## Brute force

A linear scan could check both neighbors of every index and return the first strict peak.
That takes O(n) time and is correct because the boundary values are treated as negative infinity.
The problem requires O(log n), so checking every index is too slow for the intended contract.

## Approach

1. Keep an inclusive candidate interval from left through right.
2. While it contains more than one index, compute middle.
3. If nums[middle] is less than nums[middle + 1], discard the left half through middle and set left to middle + 1.
4. Otherwise, retain middle and discard the right half by setting right to middle.
5. When the interval collapses, its only index is a valid peak.

## Walkthrough

For Example 1, nums is [1,4,2].
The first middle index is 1, and 4 is not smaller than 2, so the right boundary becomes 1.
The interval [0,1] then compares index 0 with index 1 and moves left to 1 because the slope rises.
The final index is 1, whose value 4 exceeds both neighbors.
For Example 2, [5,3,1] has a falling slope at every comparison, so the interval ends at index 0.

## Complexity

The candidate interval is at least halved on each iteration, giving O(log n) time.
Only the two boundaries and a middle index are stored, so extra space is O(1).
The algorithm returns any valid peak, which matches the validator rather than requiring one particular index.

## Edge cases

A one-element array returns index 0.
A strictly increasing array returns its last index.
A strictly decreasing array returns its first index.
Negative and extreme signed integer values are compared directly without sentinel arithmetic.

## Common mistakes

Do not set right to middle - 1 on a falling slope, because middle itself may be the peak.
Do not inspect values outside the array.
Do not require the returned index to equal the sample output when another peak is valid.
Do not treat equal values as rising in the slope comparison because adjacent input values are distinct.

## Language notes

Python uses integer floor division for middle.
Java computes the midpoint as left + (right - left) / 2 to avoid adding two large indexes.
Both references preserve the required findPeakElement signature.
