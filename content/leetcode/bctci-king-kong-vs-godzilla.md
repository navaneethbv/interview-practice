# King Kong Vs Godzilla

A building survives only if there is a strictly shorter building to its left and a strictly taller building to its right.
Return one boolean per building in the original order.
All comparisons use the original street, including buildings that do not survive.
Every position on the appropriate side is visible.

## Constraints

- 1 <= street.length <= 100,000.
- 1 <= street[i] < 1,000.


## Examples

### Example 1

```text
Input: [[2, 5, 3, 8]]
Output: [false, true, true, false]
```

### Example 2

```text
Input: [[1, 2, 3]]
Output: [false, true, false]
```
