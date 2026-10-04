## Intuition

Even values belong on the left and odd values on the right, with no ordering requirement inside either group.
Two inward moving indices identify misplaced values that can fix each other's positions through a swap.

## Brute force

Collecting evens and odds separately would need linear extra storage.
Sorting by parity takes more comparisons than necessary.
The reference partitions in place, taking advantage of the fact that any valid internal order is accepted.

## Approach

Maintain `left` and `right`.
Advance `left` when it already holds an even value.
Otherwise retreat `right` when it holds an odd value.
If neither condition applies, swap the odd left value with the even right value and reconsider the boundaries.

## Walkthrough

Example 1 starts with `[1, 2, 3, 4, 5]`.
The final 5 is already odd, so move `right` to 4 and swap it with the initial 1.
The array becomes `[4, 2, 3, 1, 5]`.
Further boundary advances finish the valid partition.

## Complexity

Each index moves only inward, and every swap fixes two boundary values that will be skipped next.
Total time is O(n), with O(1) auxiliary space.
The method returns no collection because the array itself is the output.

## Edge cases

Empty and single element arrays already satisfy the partition.
All even or all odd inputs need no swaps.
Zero is even.
Negative numbers are classified by whether their remainder is zero, just like positive numbers.

## Common mistakes

Do not require odd remainders to equal one, since negative odd integers can have remainder -1 in Java.
Do not sort within parity groups or require stable order.
After swapping, this reference intentionally advances pointers on subsequent loop iterations.

## Language notes

Python uses simultaneous assignment for swapping and Java uses a temporary integer.
Both test oddness with `% 2 != 0`.
The local `parityPartition` validator checks partition correctness and preservation of input values rather than one exact arrangement.
