## Intuition

After the processed prefix is fully compressed, only its last value can merge with the next incoming value.
A merge can expose another equal neighbor, so the same value may need to travel backward through several completed groups.

## Brute force

Repeatedly search the entire array for its first equal adjacent pair and remove one element after merging.
Array shifting and rescanning can make this O(n squared), even though every merge reduces the number of values.

## Approach

Maintain the compressed prefix in `stack`.
For each input `value`, repeatedly pop the top while it equals `value`, adding that popped value into the incoming one.
Append the resulting value when no further merge is possible.
The stack has no equal adjacent entries before the next input arrives.
Because all earlier pairs are already resolved, this performs the same leftmost merges required by the statement without rescanning them.

## Walkthrough

Example 1 begins `[8, 4, 2, 2, 2, 4]`.
The first three values produce stack `[8, 4, 2]`.
The next 2 merges with 2 into 4, then with 4 into 8, then with 8 into 16.
The remaining 2 and 4 do not match their preceding values.
The final stack is `[16, 2, 4]`.

## Complexity

Time is O(n) because each pushed entry is popped at most once.
The stack and returned sequence occupy O(n) space in the worst case, when no values merge.

## Edge cases

An empty array stays empty.
Zero values still merge and reduce the number of elements, so repeated zero merges terminate.
A run of equal values may collapse through multiple different doubled values.

## Common mistakes

A single conditional merge misses cascades such as 2 becoming 4 and then 8.
Sorting the input destroys the specified adjacency order.

## Language notes

Python returns its stack in insertion order.
Java pushes onto the front of a deque, then fills the result backward to restore the original left-to-right order, using `long` for merged values.
