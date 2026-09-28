# Channel Views

`views[i]` is the number of views on day `i`, and each `periods[j] = [l, r]` is an inclusive range of days.
Return the total views of every period, in order.

## Examples

### Example 1

```text
Input: views = [3, 5, 4, 8, 7, 2, 5, 3, 2, 3], periods = [[0, 1], [0, 5], [5, 8], [3, 3]]
Output: [8, 29, 12, 8]
```

### Example 2

```text
Input: views = [7], periods = [[0, 0]]
Output: [7]
```

## Constraints

- `1 <= views.length <= 10^5` and `0 <= views[i] < 10^4`
- `1 <= periods.length <= 10^5`
