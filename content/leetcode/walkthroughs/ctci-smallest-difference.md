## Intuition

After both arrays are sorted, the smaller current value is the only one whose pointer needs to move.
Keeping that smaller value while increasing the larger value cannot improve their difference.
This eliminates whole sets of unhelpful pairs at each step.

## Brute force

Compare every value in a with every value in b and track the smallest absolute difference.
That costs O(nm) time for lengths n and m, even when sorted order could discard most pairs.

## Approach

Create sorted copies `first` and `second`, with pointers i and j initially zero.
Update `best` with the absolute difference of the pointed values.
If `first[i]` is smaller, increment i; otherwise increment j.
Stop when either pointer leaves its array.
The discarded value cannot form a better pair with any later, larger value from the other array, so no possible improvement is skipped.

## Walkthrough

Example 1 sorts a into `[1, 2, 3, 11, 15]` and b into `[8, 19, 23, 127, 235]`.
Against 8, the first three differences are 7, 6, and 5.
Comparing 11 and 8 improves the answer to 3, then advances b's pointer to 19.
The following comparisons produce differences 8 and 4 before a is exhausted.
Return the best difference, 3.

## Complexity

Sorting costs O(n log n + m log m), followed by an O(n + m) scan.
The copied arrays use O(n + m) space.
The input arrays themselves retain their original order.

## Edge cases

A shared value produces difference zero, which is optimal.
Negative numbers and duplicate values work with the same ordering argument.
The contract supplies nonempty arrays.

## Common mistakes

Advancing the larger value's pointer can skip an improving pair.
Subtracting two Java ints before widening can overflow even when each input is individually valid.

## Language notes

Python integers handle the difference directly.
Java casts one operand to long before subtraction and returns a long, preserving differences spanning the full signed-int range.
