## Intuition

A reverse pair has an index on the left whose value is greater than twice a value on the right.
Merge sort keeps each half sorted, allowing a moving pointer to count qualifying cross-half pairs before merging.
The comparison uses widened arithmetic so doubling a signed 32-bit value is exact in Java.

## Brute force

Checking every i before every j takes O(n²) time and is too slow for 50,000 values.
Sorting values without preserving their original halves loses the required index ordering.
Divide and conquer counts cross pairs while the left and right halves still represent earlier and later indexes.

## Approach

1. Recursively sort the left and right index ranges.
2. For each sorted left value, advance right_index while the strict doubled comparison holds.
3. Add the number of qualifying right values to the count.
4. Merge the two sorted ranges into ascending order.
5. Return the counts from both children plus the cross-half count.

## Walkthrough

Example 1 uses nums = [1,3,2,3,1].

| merge context | qualifying cross pairs | running count |
| --- | --- | ---: |
| [1] with [3] | none | 0 |
| [3] with [1] | 3 > 2×1 | 1 |
| [2] with [1,3] | 2 > 2×1 is false | 1 |
| [1,3] with [1,2,3] | 3 > 2×1 | 2 |

The two qualifying pairs are the 3 at indexes 1 and 3 with the final 1.

## Complexity

Let n be nums length.
Merge sort has O(log n) levels and processes every value at each level, so time is O(n log n).
The Python slices and merged lists create O(n log n) cumulative allocation, with O(n) peak live value storage and O(log n) recursion depth.
Java uses O(n) temporary merge storage at a time and O(log n) recursion stack while writing sorted values back into nums.

## Edge cases

A one-element array has no pair.
Negative values still use the strict mathematical comparison.
Doubling a minimum integer requires long arithmetic in Java.
Equal values are counted only when the left value is strictly greater than twice the right value.

## Common mistakes

- Counting pairs after sorting the whole input loses original index direction.
- Using greater than or equal includes invalid equal boundaries.
- Reusing a right pointer without sorted halves makes counts unreliable.
- Multiplying Java ints can overflow before the comparison.

## Language notes

Python integers have arbitrary precision, so its comparison is naturally safe.
Java casts the left value and multiplier to long before multiplying.
Python creates sliced child lists and merged lists, while Java sorts the original array in place with temporary merge arrays.
