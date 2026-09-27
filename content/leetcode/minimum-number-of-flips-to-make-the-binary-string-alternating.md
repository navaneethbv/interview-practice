# Minimum Number of Flips to Make the Binary String Alternating

You may rotate s by moving its first character to the end any number of times for free.
You may also flip a chosen bit, paying one operation per flip.
Return the fewest flips required to obtain a string whose adjacent bits alternate.

## Examples

### Example 1

```text
Input: s = "111000"
Output: 2
Explanation: Changing two bits after a suitable rotation produces an alternating string.
```

### Example 2

```text
Input: s = "010"
Output: 0
Explanation: The input already alternates.
```

## Constraints

- 1 <= s.length <= 100,000
- s contains only 0 and 1.
