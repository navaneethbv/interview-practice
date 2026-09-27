# Number of Steps to Reduce a Number to Zero

While num is nonzero, divide it by 2 if even, or subtract 1 if odd.
Return the number of operations needed to reach zero.

## Examples

### Example 1

```text
Input: num = 14
Output: 6
Explanation: The sequence is 14, 7, 6, 3, 2, 1, 0.
```

### Example 2

```text
Input: num = 8
Output: 4
Explanation: Three halvings reach 1, then one subtraction reaches 0.
```

## Constraints

- 0 <= num <= 10^6
