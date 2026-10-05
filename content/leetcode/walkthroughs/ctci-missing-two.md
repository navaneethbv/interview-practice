## Intuition

The sum of 1 through n minus the input sum gives the sum of the two missing values.
The midpoint of that sum separates the smaller missing value from the larger one.
Subtracting present values on the smaller side identifies the first missing value directly.

## Brute force

A boolean array or set can mark every present number and then scan 1 through n.
That uses O(n) extra space, while the arithmetic partition needs only a few variables.

## Approach

Set n to nums.length plus two.
Compute missing_sum from the full range and subtract every input value.
Let pivot be missing_sum divided by two.
Compute the sum from 1 through pivot and subtract every input value at most pivot.
The remainder is the smaller missing number, and subtracting it from missing_sum gives the larger one.

## Walkthrough

In Example 1, n is 5 and the full sum is 15.
Subtracting 1, 3, and 5 leaves missing_sum equal to 6, so the missing values sum to 6.
The pivot is 3, and the expected sum from 1 through 3 is 6.
Present values at most 3 sum to 4, leaving 2, and the other value is 6 minus 2, or 4.

## Complexity

The input is scanned once for the full sum and once for the pivot partition.
The algorithm takes O(n) time and O(1) extra space.
Python and Java use wide intermediate arithmetic to avoid sum overflow.

## Edge cases

An empty input means n is 2 and returns [1, 2].
If the missing values are consecutive, integer division still puts exactly one on each side of the pivot.
The result is naturally increasing because smaller is computed from the lower partition.
The input contains no duplicates by the problem contract.

## Common mistakes

Using a pivot based on n instead of missing_sum can place both missing values in one partition.
Subtracting values greater than pivot from the lower sum distorts the smaller result.
Returning the two values in discovery order can violate the required increasing order.

## Language notes

Python uses a generator expression to subtract values at most pivot.
Java performs the same partition in a second loop and stores all sums in long variables.
Both implementations return the larger value as missing_sum minus smaller.
