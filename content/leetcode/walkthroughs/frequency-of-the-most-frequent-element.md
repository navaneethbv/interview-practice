## Intuition

After sorting, the best target for a window is its largest value.
The cost to raise every earlier value to that target is target times window length minus the window sum.

## Brute force

Trying every target and counting how many values can be raised to it repeats work across overlapping groups.
A direct search can take O(n squared) time.

## Approach

1. Sort the values.
2. Expand a right endpoint while maintaining the window sum.
3. Shrink from the left while the cost exceeds k.
4. Record the largest feasible window.

## Walkthrough

Example 1:

For [1,2,4] and k 5, the sorted array is unchanged.
The window [1,2,4] costs 4 times 3 minus 7, which is 5.
All three values can become 4, so the answer is 3.

## Complexity

Sorting dominates with O(n log n) time, and the sliding window adds O(n).
Python sort may use O(n) temporary storage, while Java Arrays.sort on int values uses implementation-dependent auxiliary storage, commonly O(log n) stack space.
The window counters use O(1) extra space beyond sorting.

## Edge cases

An already equal array needs no increments.
The window can shrink to one value when k is small.
Use a wide sum because target times window length can exceed int.

## Common mistakes

Do not target the smallest value in a sorted window.
Do not subtract the left value before checking the current cost.
Remember that only increments are allowed.

## Language notes

Python mutates nums in place and uses arbitrary-precision sums.
Java mutates the primitive array and stores the sliding sum in long.
