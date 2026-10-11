## Intuition

A formula cell does not own a number; it owns a list of references. Keeping formulas as reference lists and computing them when read makes them stay live automatically, because a changed input is simply read again next time.

## Approach

1. Store plain values in a grid and formulas in a map from cell to its list of referenced cells (repeats allowed).
2. `set` removes any formula and writes the value.
3. `sum` expands each entry, single cells and rectangles, into the reference list and stores it, then returns `get`.
4. `get` returns the plain value, or recursively sums the referenced cells for a formula.

## Walkthrough

In Example 1, C3 references A1, then A1, B1, A2 and B2. With A1 = 2 it is 2 + 2 = 4. After B2 becomes 2, reading C3 gives 6.

## Complexity

- Time: O(cells referenced, transitively) per get.
- Space: O(height * width + formula size).

## Edge cases

- A cell referenced twice counts twice.
- Setting a value on a formula cell removes the formula.
- Formulas can reference other formulas.

## Common mistakes

- Storing the computed sum, so later changes are not reflected.
- Deduplicating references.
