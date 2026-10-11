## Intuition

Codes are separated by spaces, so a code starting with DIAB1 is either at the beginning of the string or right after a space.

## Approach

1. Match `conditions LIKE 'DIAB1%'` for the first code.
2. Match `conditions LIKE '% DIAB1%'` for later codes.
3. Return rows matching either pattern.

## Walkthrough

In Example 1, Bob's first code is DIAB100 and George's second code is DIAB100. Alain's DIAB201 does not start with DIAB1.

## Complexity

- Time: O(N · L) for N patients with condition strings of length L.
- Space: proportional to the result and any grouping state.

## Edge cases

- A code like SADIAB100 contains DIAB1 but does not start with it.
- An empty condition string never matches.

## Common mistakes

- `LIKE '%DIAB1%'` matches codes that only contain the prefix.
- Assuming SQLite supports `REGEXP`; it does not without an extension.

## SQLite notes

SQLite's `LIKE` is case-insensitive for ASCII letters; the codes here are uppercase, so that does not matter.
