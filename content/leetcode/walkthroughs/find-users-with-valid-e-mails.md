## Intuition

Split the check into the shape of the whole address (first letter, exact domain) and the characters allowed in the prefix.

## Approach

1. Require `mail GLOB '[a-zA-Z]*@leetcode.com'`, which fixes the first character and the domain.
2. Take the prefix, the text before the last 13 characters.
3. Reject prefixes containing any character outside letters, digits, `_`, `.` and `-`.

## Walkthrough

In Example 1, winston, bella- and sally.come are valid. quarz#2020 contains '#', .shapo starts with a period, and david69 uses another domain.

## Complexity

- Time: O(N · L) for N users with addresses of length L.
- Space: proportional to the result and any grouping state.

## Edge cases

- The domain is case-sensitive.
- An address that is only @leetcode.com has an empty prefix and fails the first-letter check.
- Text after the domain fails the match.

## Common mistakes

- Using `LIKE`, which is case-insensitive and treats `_` as a wildcard.
- Allowing a digit or period as the first character.

## SQLite notes

SQLite has no built-in `REGEXP`. `GLOB` is case-sensitive and supports character classes, including negated classes with `^`.
