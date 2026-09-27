# Nth Magical Number

A positive integer is magical if it is divisible by a or b.
Find the nth magical number in increasing order, counting shared multiples once.
Return the result modulo 1000000007.

## Examples

### Example 1

```text
Input: n = 4, a = 2, b = 3
Output: 6
Explanation: The first four magical numbers are 2,3,4,6.
```

### Example 2

```text
Input: n = 3, a = 4, b = 4
Output: 12
Explanation: Equal divisors produce the multiples of 4.
```

## Constraints

- 1 <= n <= 1000000000.
- 2 <= a, b <= 40000.
