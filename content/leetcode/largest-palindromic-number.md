# Largest Palindromic Number

Use any nonempty selection of the digits in num, in any order, to form the numerically largest palindrome.
Each occurrence may be used at most once.
The result must not begin with zero unless it is exactly "0".

## Examples

### Example 1

```text
Input: num = "444947137"
Output: "7449447"
Explanation: Use paired 7s and 4s around a central 9.
```

### Example 2

```text
Input: num = "00009"
Output: "9"
Explanation: Zeroes cannot surround the 9 because that would introduce a leading zero.
```

## Constraints

- 1 <= num.length <= 100000
- num contains decimal digits.
