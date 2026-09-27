# Super Ugly Number

A positive integer is super ugly when every prime factor belongs to primes.
The number 1 is included.
Return the n-th such integer in increasing order.

## Examples

### Example 1

```text
Input: n = 6, primes = [2, 3]
Output: 8
Explanation: The sequence starts 1, 2, 3, 4, 6, 8.
```

### Example 2

```text
Input: n = 1, primes = [7, 13]
Output: 1
Explanation: One is always the first member.
```

## Constraints

- 1 <= n <= 100000
- 1 <= primes.length <= 100
- primes contains distinct primes in increasing order.
- The answer fits a signed 32-bit integer.
