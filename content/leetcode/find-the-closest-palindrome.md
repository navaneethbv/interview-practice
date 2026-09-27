# Find the Closest Palindrome

Return the decimal representation of the integer palindrome numerically closest to n, excluding n itself.
If two candidates are equally close, choose the smaller one.
Leading zeros are not allowed, except for the number zero.

## Constraints

- n is a positive integer string with 1 to 18 digits and no leading zeros.

## Examples

### Example 1

```text
Input: n = "123"
Output: "121"
Explanation: 121 is two away, closer than any other palindrome.
```

### Example 2

```text
Input: n = "1"
Output: "0"
Explanation: Zero and two are equally close, so choose zero.
```
