# Biggest Single Number

A single number appears exactly once in MyNumbers. Report the largest single number, or null when there is none.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `num`; row order is unrestricted.

## Tables

### MyNumbers

| Column | SQLite type |
| --- | --- |
| num | INTEGER |

## Constraints

- The table may contain duplicates.

## Examples

### Example 1

```text
Input: {"tables": {"MyNumbers": [[8], [8], [3], [3], [1], [4], [5], [6]]}}
Output: [[6]]
Explanation: The single numbers are 1, 4, 5 and 6.
```

### Example 2

```text
Input: {"tables": {"MyNumbers": [[8], [8], [7], [7], [3], [3], [3]]}}
Output: [[null]]
Explanation: No number appears once, so the answer is null.
```
