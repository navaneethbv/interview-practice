## Intuition

Both input portions are sorted, but nums1 has empty slots after its first m values.
The largest remaining value belongs at the rightmost unfilled position.
Filling backward prevents an unmerged nums1 value from being overwritten.

## Brute force

A simple approach could copy the first m values and all n values into a new array, then sort it.
That costs O((m plus n) log(m plus n)) time and O(m plus n) extra space.
The reverse merge uses the existing capacity and keeps both sorted portions intact until each value is placed.

## Approach

1. Point first at the last initialized nums1 value and second at the last nums2 value.
2. Point writeIndex at the final slot of nums1.
3. Compare the two available values and write the larger one at writeIndex.
4. Move the pointer that supplied the value and move writeIndex left.
5. Continue until every nums2 value has been copied, because leftover nums1 values are already positioned.

## Walkthrough

Example 1 starts with nums1 [1, 4, 0, 0], m 2, and nums2 [2, 3], n 2.
The largest candidates are 4 and 3, so 4 moves to index 3.
Then 3 moves to index 2.
The next comparison places 2 at index 1, leaving 1 already at index 0.
The merged array is [1, 2, 3, 4].

## Complexity

The pointers move a total of at most m plus n positions, giving O(m plus n) time.
The merge uses O(1) auxiliary space and writes directly into nums1.
The nums1 buffer is caller-provided output storage rather than a new result allocation.
The loop stops when nums2 is exhausted because any remaining nums1 prefix is already sorted.

## Edge cases

If n is zero, nums1 already contains the complete result.
If m is zero, every nums2 value is copied from right to left.
Equal values can come from either array without changing sorted order.
The arrays are assumed sorted as stated.

## Common mistakes

- Filling from the front overwrites unmerged nums1 values.
- Comparing nums1[m] instead of its last initialized index reads an empty slot.
- Stopping when nums1 is exhausted leaves nums2 values uncopied.
- Copying the entire first array into a new buffer defeats the in-place requirement.

## Language notes

Python mutates the list supplied by the harness and returns None.
Java mutates the int array and uses the void merge signature.
Both implementations only require one write pointer and two source pointers.
