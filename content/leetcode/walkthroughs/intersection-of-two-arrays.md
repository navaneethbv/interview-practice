## Intuition

The result needs each value only once, even when either input repeats it.
A set built from the first array can answer membership queries for every value in the second array.
A second set records common values, and sorting gives deterministic output even though the contract ignores order.

## Brute force

The naive method can compare every value in nums1 with every value in nums2 and then remove duplicate results.
For lengths m and n, those comparisons take O(m × n) time before deduplication.
Hash sets reduce membership work to expected O(1) per value.

## Approach

1. Insert every nums1 value into first_values.
2. Scan nums2 and add a value to common_values when first_values contains it.
3. Convert the unique common values to a list or array.
4. Sort the Python result for stable presentation; Java may return any order because the spec uses unordered comparison.

## Walkthrough

Example 1 uses nums1 = [1, 2, 2, 3] and nums2 = [2, 3, 4].

| value from nums2 | first_values contains it | common_values |
| ---: | --- | --- |
| 2 | yes | {2} |
| 3 | yes | {2, 3} |
| 4 | no | {2, 3} |

The returned Python list is [2, 3], and duplicate 2 entries never create another result.

## Complexity

Let m and n be the input lengths and u be the number of distinct common values.
Building and scanning the sets takes expected O(m + n) time.
Python additionally sorts u results in O(u log u) time, while Java converts its set without sorting.
The sets and returned values use O(m + n) space in the worst case.

## Edge cases

Disjoint arrays return an empty result.
Repeated values still produce one result entry.
Zero and negative values would be handled like any other integer if supplied.
A one-element overlap is recorded once.

## Common mistakes

- Returning every matching pair counts duplicates incorrectly.
- Using a list membership scan keeps the quadratic brute force cost.
- Sorting both full inputs is unnecessary for the set solution.
- Assuming Java HashSet iteration order is sorted is unsafe.

## Language notes

Python's set intersection accepts the second iterable and sorted creates the ordered display list.
Java stores boxed integers in HashSet and converts the result through an IntStream.
The specification compares results as unordered, so Java does not need a sorting step.
