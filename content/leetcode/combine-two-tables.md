# Combine Two Tables

List each person with the city and state from each matching address.
A person without an address still contributes a row with null address fields.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `firstName`, `lastName`, `city`, `state`; row order is unrestricted.

## Tables

### Person

| Column | SQLite type |
| --- | --- |
| personId | INTEGER |
| lastName | TEXT |
| firstName | TEXT |

### Address

| Column | SQLite type |
| --- | --- |
| addressId | INTEGER |
| personId | INTEGER |
| city | TEXT |
| state | TEXT |

## Constraints

- `personId` uniquely identifies a Person and `addressId` uniquely identifies an Address.
- Multiple addresses may refer to one person.
- Names and address text are non-null; tables may be empty.

## Examples

### Example 1

```text
Input: {"tables": {"Person": [[1, "Park", "Mina"], [2, "Lee", "Jae"]], "Address": [[5, 2, "Seattle", "WA"]]}}
Output: [["Mina", "Park", null, null], ["Jae", "Lee", "Seattle", "WA"]]
Explanation: The unmatched person remains in the result.
```

### Example 2

```text
Input: {"tables": {"Person": [[4, "Li", "Bo"]], "Address": [[1, 4, "Austin", "TX"], [2, 4, "Dallas", "TX"]]}}
Output: [["Bo", "Li", "Austin", "TX"], ["Bo", "Li", "Dallas", "TX"]]
Explanation: Both addresses produce rows.
```
