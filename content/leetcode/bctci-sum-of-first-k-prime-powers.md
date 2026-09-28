# Sum of First K Prime Powers

`primes` holds distinct primes.
Consider the increasing sequence of all numbers that are a positive power of some prime in the list, such as 2, 3, 4, 8, 9 for `[2, 3]`.
Return the sum of its first `k` numbers modulo `1,000,000,007`.

## Examples

### Example 1

```text
Input: primes = [2, 3], k = 7
Output: 69
Explanation: 2 + 3 + 4 + 8 + 9 + 16 + 27.
```

### Example 2

```text
Input: primes = [5], k = 3
Output: 155
```

## Constraints

- `1 <= primes.length <= 10^4`
- `0 <= k <= 10^5`
- The `k`th number of the sequence is below `10^18`.
