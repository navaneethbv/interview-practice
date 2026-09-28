## Intuition

The product's sign depends only on whether the number of negative factors is even or odd.
A zero can be detected immediately, so the product itself never needs to be formed.

## Brute force

Multiplying every value directly risks overflow in fixed-width languages.
Tracking sign changes uses one pass and constant state.

## Approach

1. Start `sign` at 1.
2. Return 0 on the first zero.
3. Flip `sign` for every negative value.
4. Return the final sign.

## Walkthrough

For Example 1, values `[-2, -3, 4]` start with sign 1.
The first negative flips it to -1, and the second flips it back to 1.
The positive 4 changes nothing, so the answer is `1`.

## Complexity

The scan takes `O(n)` time and uses `O(1)` extra space.
The algorithm therefore works for the full input length without allocating a product-sized numeric value.
It also stops early when zero makes the final sign certain.
This avoids both overflow and unnecessary work for later factors.

## Edge cases

Any zero makes the result zero regardless of other values.
One negative factor gives -1, while an even number of negatives gives 1.

## Common mistakes

- Multiplying values can overflow even when only the sign is needed.
- Counting zero as a negative factor returns the wrong result.
- Flipping on positive values changes the sign incorrectly.

## Language notes

Python and Java both use integer sign state and return immediately for zero.
The references never depend on the product's numeric magnitude.
