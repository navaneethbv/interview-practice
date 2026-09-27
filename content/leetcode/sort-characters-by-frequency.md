# Sort Characters By Frequency

Rearrange all characters of `s` so characters with higher frequency appear before those with lower frequency.
All occurrences of one character must form a single block.
Blocks with equal frequencies may appear in any order.

## Constraints

- `1 <= s.length <= 500000`.
- `s` contains uppercase and lowercase English letters and digits.

## Examples

### Example 1

```text
Input: s = "aabbc"
Output: "aabbc"
Explanation: The two frequency-two blocks precede c.
```

### Example 2

```text
Input: s = "Aabbb"
Output: "bbbAa"
Explanation: Case-sensitive A and a each appear once.
```
