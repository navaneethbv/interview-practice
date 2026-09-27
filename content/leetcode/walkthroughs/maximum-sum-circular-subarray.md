## Intuition
A best circular segment either stays contiguous in the array or wraps around the end.
The wrapped sum equals total sum minus the minimum ordinary subarray, except when every value is negative.

## Brute force
Enumerating every start and end around a duplicated array takes O(n^2) time.
A running sum per start uses O(1) extra space but repeats overlapping work.
Kadane's maximum and minimum scans solve both cases together.

## Approach
1. Track the best ordinary maximum subarray with Kadane's recurrence.
2. Track the smallest ordinary subarray with the dual recurrence.
3. Compute the wrapped candidate as total minus best minimum.
4. Return the ordinary maximum when every value is negative to forbid an empty segment.

## Walkthrough
Example 1 is `[5, -2, 4]`.
The ordinary maximum reaches 7 from `[5,-2,4]`, while the minimum subarray is `[-2]` with sum -2.
The total is 7, so excluding the minimum gives wrapped sum `7 - (-2) = 9`.
That corresponds to wrapping 4 to 5 and skipping -2.
The result is 9.

## Complexity
The scan takes O(n) time and O(1) auxiliary space.
Both references index the original array without copying the input.
The returned value stores no subarray.

## Edge cases
An all-negative array must return its largest element, not zero.
A one-element array returns that element.
A fully selected circular segment is represented by the ordinary maximum case.

## Common mistakes
Returning total minus minimum for all-negative input selects an empty complement.
Using only ordinary Kadane misses wrapping segments.
Allowing a segment to use an index twice violates the nonempty circular definition.

## Language notes
Python integers are unbounded.
Java uses `int` states under the local numeric bounds and keeps all updates in one pass.
