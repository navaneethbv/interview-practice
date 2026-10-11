## Intuition

Most cells are never touched, so a map from cell name to value is enough; missing cells read as 0. A formula is just two terms, each a literal or a lookup.

## Approach

1. Keep a map from cell name to value.
2. `setCell` writes, `resetCell` removes.
3. `getValue` strips the '=', splits on '+', and adds each term as a number if it starts with a digit, otherwise as a cell lookup defaulting to 0.

## Walkthrough

In Example 1, =5+7 is 12. After A1 = 10, =A1+6 is 16. With B2 = 15, =A1+B2 is 25; after resetting A1 it is 15.

## Complexity

- Time: O(length of formula) per getValue.
- Space: O(cells set).

## Edge cases

- Never-set and reset cells read as 0.
- Cell names have one letter and a row number that may have several digits.

## Common mistakes

- Allocating a 26 x rows grid when only a few cells are used.
- Treating multi-digit row numbers as a single digit.
