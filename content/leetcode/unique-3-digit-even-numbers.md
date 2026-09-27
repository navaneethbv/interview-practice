# Unique 3-Digit Even Numbers

Count distinct three-digit even integers you can form using three different positions from digits.
The first digit cannot be zero.
Repeated input digits can be used up to their available multiplicity, but identical resulting numbers count only once.

## Examples

### Example 1

```text
Input: digits = [0, 2, 2]
Output: 2
Explanation: The possible numbers are 202 and 220.
```

### Example 2

```text
Input: digits = [1, 3, 5]
Output: 0
Explanation: No available last digit is even.
```

## Constraints

- 3 <= digits.length <= 10.
- 0 <= digits[i] <= 9.
