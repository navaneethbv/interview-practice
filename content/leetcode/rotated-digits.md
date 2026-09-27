# Rotated Digits

A number is good if rotating every digit 180 degrees produces a valid number different from the original.
Digits 0, 1, and 8 stay unchanged; 2 and 5 swap, and 6 and 9 swap.
Digits 3, 4, and 7 are invalid.
Count good integers from 1 through n.

## Examples

### Example 1

```text
Input: n = 10
Output: 4
Explanation: The good values are 2, 5, 6, and 9.
```

### Example 2

```text
Input: n = 1
Output: 0
Explanation: One remains unchanged.
```

## Constraints

- 1 <= n <= 10000
