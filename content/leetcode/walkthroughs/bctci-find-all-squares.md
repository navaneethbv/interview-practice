## Intuition

A value's square can be found through a direct value-to-index lookup.
The distinct-input guarantee means every present square has exactly one target index, so no index lists are needed.

## Brute force

Comparing the square of every value with every other entry costs O(n squared) time.
A hash map turns each square search into an expected constant-time lookup.

## Approach

First build `position`, mapping each array value to its original index.
Then scan every value at index i, compute its square, and check whether that square is in position.
If present, append `[i, position[square]]`.
The map is complete before scanning, so squares are found whether they occur earlier or later in the array.
Every index is considered once as the base, which emits all valid pairs without duplicate generation.

## Walkthrough

```text
Input: arr = [4, 10, 3, 100, 5, 2, 10000]
Output: [[5, 0], [1, 3], [3, 6]]
```

In Example 1, value 2 at index 5 squares to 4 at index 0, giving `[5, 0]`.
Value 10 at index 1 squares to 100 at index 3, giving `[1, 3]`.
Value 100 at index 3 squares to 10000 at index 6, giving `[3, 6]`.
No other base has its square present.
The reference may enumerate these pairs in a different order, which is accepted.

## Complexity

Building the map and querying once per element takes expected O(n) time.
The map and output require O(n) space.
No sorting or modification of the input is needed.

## Edge cases

An empty array returns no pairs.
Value 1 pairs with its own index, explicitly allowed here.
A square larger than every input value simply fails the lookup.

## Common mistakes

Return indices rather than values.
Do not forbid i equal to j, since that would lose the valid value-1 case.

## Language notes

Python integers safely represent large squares.
Java casts before multiplication and uses Long map keys, so squaring an int cannot overflow before the lookup.
