## Intuition

XOR is its own inverse. Each prefix adds one element: pref[i] = pref[i - 1] ^ arr[i]. XOR both sides with pref[i - 1] to recover arr[i].

## Approach

1. arr[0] = pref[0].
2. For i >= 1, arr[i] = pref[i - 1] ^ pref[i].

## Walkthrough

For [5, 2, 0, 3, 1], arr is [5, 5 ^ 2 = 7, 2 ^ 0 = 2, 0 ^ 3 = 3, 3 ^ 1 = 2].

## Complexity

- Time: O(n).
- Space: O(n) for the output.

## Edge cases

- Equal neighbouring prefixes mean the element was 0.

## Common mistakes

- Using subtraction as if the prefix were a sum.
- XORing with pref[i] twice, which cancels out.
