# Living People

Person `i` was born in `birth[i]` and died in `death[i]`, and counts as alive in both of those years.
All years are between 1900 and 2000 inclusive.
Return the year in which the most people were alive; if several years tie, return the earliest.

## Examples

### Example 1

```text
Input: birth = [1900, 1950, 1960], death = [1970, 1990, 1965]
Output: 1960
```

### Example 2

```text
Input: birth = [1990], death = [1990]
Output: 1990
```

## Constraints

- `1 <= birth.length == death.length <= 100,000`
- `1900 <= birth[i] <= death[i] <= 2000`
