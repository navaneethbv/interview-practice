# Recyclable and Low Fat Products

Return ids of products marked both low fat and recyclable.
Both flags must equal `Y`.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `product_id`; row order is unrestricted.

## Tables

### Products

| Column | SQLite type |
| --- | --- |
| product_id | INTEGER |
| low_fats | TEXT |
| recyclable | TEXT |

## Constraints

- Product ids are unique.
- Each flag is either `Y` or `N`, never null.

## Examples

### Example 1

```text
Input: {"tables": {"Products": [[1, "Y", "N"], [2, "N", "Y"], [3, "Y", "Y"]]}}
Output: [[3]]
Explanation: Only product 3 satisfies both flags.
```

### Example 2

```text
Input: {"tables": {"Products": [[1, "N", "N"]]}}
Output: []
Explanation: Neither flag is set.
```
