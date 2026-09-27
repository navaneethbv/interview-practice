## Intuition
Set `difference[i] = nums1[i] - nums2[i]`.
The inequality becomes `difference[i] <= difference[j] + diff`, so while scanning j we need a count of earlier differences below a limit.

## Brute force
Comparing every pair costs O(n^2).
A Fenwick tree over compressed values counts qualifying earlier indices in logarithmic time.

## Approach
1. Build all differences and sorted coordinate values.
2. For each current difference, query values at most `current + diff`.
3. Add the current value to its compressed Fenwick position after querying.
4. Return the accumulated count.

## Walkthrough
For Example 1, differences are `[1,0,4]` and `diff = 1`.
The second value 0 counts the earlier 1 because 1 is at most 1.
The final value 4 counts both earlier values because both are at most 5.
The total is 3.

## Complexity
Coordinate sorting and n Fenwick operations take O(n log n) time.
The coordinate array and tree use O(n) space.

The Fenwick prefix query represents exactly the earlier indices already inserted, so equal values and repeated positions are handled independently.

## Edge cases
Duplicate differences share a coordinate but count as separate indices.
Query before insertion enforces i < j.

Coordinate compression keeps the tree compact even when differences are negative or widely separated.

## Common mistakes
Preserve the inequality direction.
Use an upper bound for the query limit.
Do not include the current index in its own query.

## Language notes
Python uses `bisect` and a Fenwick list.
Java implements lower and upper bound helpers over the sorted array.
