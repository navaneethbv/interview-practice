# King Kong Vs Godzilla In The Fog

A building survives only if there is a strictly shorter building to its left and a strictly taller building to its right.
Return one boolean per building in the original order.
All comparisons use the original street, including buildings that do not survive.
Only positions at distance at most `k` are visible on either side.

## Constraints

- 1 <= street.length <= 100,000.
- 1 <= street[i] < 1,000.
- 1 <= k <= street.length.


## Examples

### Example 1

```text
Input: [[2, 5, 3, 8], 1]
Output: [false, false, false, false]
```

### Example 2

```text
Input: [[1, 2, 3], 2]
Output: [false, true, false]
```
