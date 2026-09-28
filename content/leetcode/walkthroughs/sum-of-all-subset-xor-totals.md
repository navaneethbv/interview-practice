## Intuition

Any bit set in at least one input value appears in exactly half of all subset XOR results.
Therefore the total is the bitwise OR of all values multiplied by `2^(n - 1)`.

## Brute force

Enumerating all `2^n` subsets and computing each XOR is direct but exponential.
The bit-frequency observation reduces the calculation to one OR and one power of two.

## Approach

1. OR every value into `combined`.
2. Compute `1 << (n - 1)`.
3. Return `combined * multiplier`.

## Walkthrough

For Example 1, `nums = [1, 3]` has OR value 3 and multiplier `2`.
The subset XORs are 0, 1, 3, and 2, which sum to 6.
The formula also gives `3 * 2 = 6`.

## Complexity

The bitwise OR shortcut works because every bit present in any input appears in exactly half of all subsets, so its total contribution is multiplied by `2^(n-1)` before summing.

The OR scan takes `O(n)` time.
The method uses `O(1)` extra space.

## Edge cases

With one value, the multiplier is one and the result equals that value.
Equal values at different positions are still covered by the half-of-subsets argument.

## Common mistakes

- Using sum instead of OR loses bitwise overlap.
- Enumerating values rather than subset positions mishandles duplicates.
- Forgetting the empty subset's zero does not change the total but can confuse enumeration reasoning.

## Language notes

Python and Java both use integer bitwise OR and left shift.
The local maximum of 12 values keeps the final sum within the Java integer return type.
