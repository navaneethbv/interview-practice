# Last Person to Fit in the Bus

People board in increasing turn order while the total weight stays at most 1000 kilograms. Report the name of the last person who fits.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `person_name`; row order is unrestricted.

## Tables

### Queue

| Column | SQLite type |
| --- | --- |
| person_id | INTEGER |
| person_name | TEXT |
| weight | INTEGER |
| turn | INTEGER |

## Constraints

- turn values are 1..n and unique; the first person always fits.

## Examples

### Example 1

```text
Input: {"tables": {"Queue": [[5, "Alice", 250, 1], [4, "Bob", 175, 5], [3, "Alex", 350, 2], [6, "John Cena", 400, 3], [1, "Winston", 500, 6], [2, "Marie", 200, 4]]}}
Output: [["John Cena"]]
Explanation: After Marie the bus holds 1000 kilograms, so Bob does not fit.
```

### Example 2

```text
Input: {"tables": {"Queue": [[1, "Solo", 1000, 1], [2, "Late", 1, 2]]}}
Output: [["Solo"]]
Explanation: Exactly 1000 kilograms fits.
```
