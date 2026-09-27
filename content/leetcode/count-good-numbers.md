# Count Good Numbers

Count digit strings of length n whose zero-based even positions contain an even digit and whose odd positions contain a prime digit.
Even digits are 0,2,4,6,8 and prime digits are 2,3,5,7.
Leading zeros are allowed.
Return the count modulo 1,000,000,007.

## Examples

### Example 1

```text
Input: n = 1
Output: 5
Explanation: The one position has five even-digit choices.
```

### Example 2

```text
Input: n = 2
Output: 20
Explanation: There are five choices followed by four choices.
```

## Constraints

- 1 <= n <= 10^15
