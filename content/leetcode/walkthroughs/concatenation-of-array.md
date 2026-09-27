## Intuition

The desired array is the input followed immediately by the same input again.
Copy each input value into two output positions or use the input index modulo its length.

## Brute force

Appending elements one at a time to an immutable array abstraction can repeatedly copy prior values.
A pre-sized output makes the required storage explicit.

## Approach

1. Allocate an output of twice the input length.
2. For each output index, read nums at index modulo the input length.
3. Return the filled output.

## Walkthrough

Example 1:

For [1,2,1], output indices zero through two copy 1, 2, and 1.
Indices three through five repeat the same modulo positions.
The result is [1,2,1,1,2,1].

## Complexity

The output has 2n entries, so time is O(n).
The returned array uses O(n) space.
Python's nums plus nums creates a new list, and Java allocates a new primitive array.

## Edge cases

The stated input is nonempty, so each modulo lookup has a valid divisor.
A one-element input duplicates that one value.
Values are copied without sorting or transformation.

## Common mistakes

Do not append the input object twice when an independent array is required.
Copy exactly two occurrences of every input position.
Preserve duplicate values and their original order.

## Language notes

Python list concatenation naturally returns a new list.
Java uses modulo indexing to fill both halves of a primitive output array.
The two references return independent output containers, so later caller changes do not alter the original through aliasing.
