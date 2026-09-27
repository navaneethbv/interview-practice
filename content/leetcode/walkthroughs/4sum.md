## Intuition

After sorting, fixing the first two values leaves a two-pointer search for the final pair.
The sorted order tells which pointer to move when the four-value sum is too small or too large.
Skipping equal choices at each level prevents duplicate quadruplets.

## Brute force

Checking every four-index combination takes O(n to the fourth power) time.
A set can remove duplicate value quadruplets, but it adds storage and does not improve enumeration work.
Sorting and reducing each pair search to two pointers lowers the search to cubic time.

## Approach

1. Sort nums so values and duplicates have predictable order.
2. Choose a first index and skip it when its value equals the previous first value.
3. Choose a second index with the same duplicate rule.
4. Set left and right around the remaining suffix and compare the four-value sum.
5. Move left for a small sum, right for a large sum, or record a match and skip equal pair values.

## Walkthrough

Example 1 sorts [1, 0, -1, 0, 2, -2] into [-2, -1, 0, 0, 1, 2].
With first -2 and second -1, the pair search finds 1 and 2, producing `[-2,-1,1,2]`.
With first -2 and second 0, the pair search finds 0 and 2, producing `[-2,0,0,2]`.
With first -1 and second 0, it finds 0 and 1, producing `[-1,0,0,1]`.
Duplicate checks avoid recording the same value tuple again, producing the three expected quadruplets.

## Complexity

Let n be the number of values and q be the number of returned quadruplets.
Sorting costs O(n log n), and the nested first and second loops each invoke an O(n) two-pointer scan.
The total time is O(n cubed) plus O(q) output construction.
The returned quadruplets use O(q) space, and a safe bound including sorting workspace is O(n + q) total auxiliary and output storage.
The pair scan itself adds only O(1) pointer space beyond that bound.

## Edge cases

Fewer than four values produce no quadruplets.
Negative targets and values are handled by the same long-safe sum comparison.
Several equal values require duplicate skipping at first, second, left, and right positions.
Java widens the total to long before adding four integers.

## Common mistakes

- Skipping only the first duplicate level still emits repeated quadruplets.
- Moving both pointers after a nonmatching sum can skip valid pairs.
- Using integer addition in Java can overflow before comparison with target.
- Returning index tuples instead of value quadruplets violates the output contract.

## Language notes

Python sorts its list in place and appends fresh four-value lists.
Java sorts the array and builds fixed-size lists with Arrays.asList.
The Java helper isolates the pair scan and keeps the public method readable.
