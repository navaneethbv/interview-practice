# Bulls and Cows

Compare equal-length digit strings.
A bull is a matching digit at the same position; a cow is a matching remaining digit at a different position.
Each occurrence can be used once.
Return the hint as bullsA followed by cowsB, such as 1A3B.

## Examples

### Example 1

```text
Input: secret = "1807", guess = "7810"
Output: "1A3B"
Explanation: The 8 is correctly placed; the other three digits are misplaced matches.
```

### Example 2

```text
Input: secret = "1123", guess = "0111"
Output: "1A1B"
Explanation: Only one unmatched 1 remains available after counting the bull.
```

## Constraints

- 1 <= secret.length == guess.length <= 1,000
- Both strings contain decimal digits.
