## Intuition

At index i, the number of missing positive integers before arr[i] is arr[i] - i - 1.
That count is nondecreasing because arr is strictly increasing.
Binary search finds the first index whose missing count reaches k, and the answer is left plus k.

## Brute force

A simple counter can walk positive integers and skip values present in arr.
In the worst case it may inspect O(arr[last] + k) values, and a repeated membership search can be slower.
The missing-count formula uses logarithmic binary search over arr indexes.

## Approach

1. Set left to zero and right to arr length.
2. Compute the missing count at middle.
3. If fewer than k values are missing there, move left past middle.
4. Otherwise keep middle and search the left half.
5. Return left plus k after finding the first sufficient gap.

## Walkthrough

Example 1 uses arr = [2,3,4,7,11] and k = 5.

| bounds | middle | missing before arr[middle] | decision |
| --- | ---: | ---: | --- |
| [0,5) | 2 | 4 - 2 - 1 = 1 | search right |
| [3,5) | 4 | 11 - 4 - 1 = 6 | search left |
| [3,4) | 3 | 7 - 3 - 1 = 3 | search right |
| [4,4) | none | first sufficient gap index 4 | answer 4 + 5 = 9 |

The missing values through 9 are 1,5,6,8,9.

## Complexity

Let n be arr length.
The binary search evaluates O(log n) missing counts, so time is O(log n).
Only the search indexes are stored, giving O(1) auxiliary space.

## Edge cases

If k is before the first array value, left remains zero and the answer is k.
If all listed values precede the answer, the returned formula continues after arr.
A missing count of exactly k keeps its index as a candidate.
The strict ordering guarantee makes the missing-count sequence monotonic.

## Common mistakes

- Using arr[i] - i instead of arr[i] - i - 1 shifts every count.
- Returning arr[left] when the answer lies inside the gap misses the final formula.
- Treating right as the last index makes the post-array gap harder to represent.
- Linear scanning ignores the requested logarithmic bound.

## Language notes

Python and Java use a half-open search range with right equal to arr length.
Java computes the midpoint from the difference to avoid index overflow.
Both return an int under the supplied bounds.
