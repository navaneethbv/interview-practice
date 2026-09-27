# Strictly Palindromic Number

A number is strictly palindromic when its digit sequence reads the same forward and backward in every base from 2 through n-2, inclusive.
Determine whether n has this property.

## Examples

### Example 1

```text
Input: n = 4
Output: false
Explanation: In base 2, the digits are 100, which are not a palindrome.
```

### Example 2

```text
Input: n = 7
Output: false
Explanation: Base 2 gives 111, but base 3 gives 21, so the requirement fails.
```

## Constraints

- 4 <= n <= 100000
- Base representations have no leading zeroes.
