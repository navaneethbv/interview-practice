## Intuition

A subarray sum from i through j-1 is `prefix[j] - prefix[i]`.
During merge sort, left prefix values and right prefix values are sorted, so two moving pointers count every cross-half difference inside `[lower, upper]` without checking every pair.

## Brute force

Enumerating all O(n^2) subarrays and summing them with prefixes is quadratic.
It also ignores that sorted halves allow monotonic pointer movement.

## Approach

1. Build prefix sums with a leading zero.
2. Recursively sort each half of the prefix array.
3. For each left value, advance lower and upper pointers over the right half to count valid differences.
4. Merge the halves so the parent call receives sorted values.

## Walkthrough

For Example 1, prefixes for `[-2,5,-1]` are `[0,-2,3,2]`.
The valid subarrays are `[-2]` with sum -2, `[-1]` with sum -1, and the full array with sum 2.
The divide-and-merge calls count those three cross or within-half pairs and return 3.

## Complexity

The merge sort performs O(n log n) time and counts each prefix at each level.
The Java array reuses the prefix storage with temporary merge arrays whose geometric sizes give O(n) peak auxiliary space.
Python's `values[:middle]` and `values[middle:]` create O(n log n) copied elements over the run, but the geometrically shrinking active slices use O(n) peak retained slice space.
Both use 64-bit or arbitrary-size prefix values for sums.

## Edge cases

The leading zero represents subarrays that begin at index zero.
Equal prefix sums count when the range includes zero.
The answer can be larger than the number of input values, as repeated zero sums demonstrate.

## Common mistakes

Use `lower <= right - left <= upper` with the correct strict pointer bounds.
Merge after counting so the parent sees sorted halves.
Use wide prefix arithmetic for extreme positive and negative values.

## Language notes

Python returns the count from `_solve` after also returning the sorted list.
Java returns the count from recursive `countAndSort` and copies merged values back into the shared array.
