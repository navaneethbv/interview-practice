## Intuition
The large input limit requires the same boundary observation as the smaller version without enumerating intervals.
A valid retained prefix and valid retained suffix can be joined only when the prefix's last value is smaller than the suffix's first value.
Both boundaries move in one direction, so the total count is linear.

## Brute force
Checking every interval and validating the remaining array costs O(N cubed) time in the worst case.
Even precomputing increasing prefixes still leaves O(N squared) candidate joins.
The moving boundaries eliminate repeated comparisons.

## Approach
1. Extend `left` across the strictly increasing prefix.
2. If it reaches the last index, return the triangular count of all nonempty intervals.
3. Count the initial choices that remove through the end of the array.
4. Move `right` left while the suffix remains strictly increasing.
5. Decrease `left` until its value is smaller than `nums[right]`, then add `left + 2` valid prefix choices.
6. Stop when the suffix itself ceases to be strictly increasing.

## Walkthrough
Example 1 is `[1, 2, 3]`.
The initial increasing prefix reaches the final index, so the method returns `3 * 4 / 2 = 6` immediately.
This includes every nonempty removal interval, including removing the whole array.
The same shortcut handles any fully increasing input without nested interval enumeration.

## Complexity
Each pointer only moves left, so the algorithm takes O(N) time.
It uses O(1) additional space and returns a 64-bit count because there can be O(N squared) intervals.

## Edge cases
An empty remainder after removing the entire array qualifies.
Equal adjacent retained values fail the strict comparison.
For a decreasing array, only the endpoint patterns counted by the boundary scan survive.

## Common mistakes
Returning an `int` can overflow near N equal to 100000.
Treating a suffix as valid after a non-increasing adjacent pair overcounts.
Using `<=` at the join allows equal boundary values that are not strictly increasing.

## Language notes
Python's integer result has no overflow concern.
Java stores `result` as `long` and casts the triangular expression before multiplication.
The two references use scalar pointers and never allocate a table.
