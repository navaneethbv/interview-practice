# Number of Substrings Containing All Three Characters

Given a string `s` containing only `a`, `b`, and `c`, count its contiguous substrings that contain all three characters at least once.
Different starting or ending positions count separately, even if their text is identical.

## Examples

### Example 1
```text
Input: s = "abcabc"
Output: 10
```
The valid counts grouped by ending position are 0, 0, 1, 2, 3, and 4.

### Example 2
```text
Input: s = "aaacb"
Output: 3
```
The three valid substrings start at positions 0, 1, and 2 and end at the final `b`.

## Constraints

- `1 <= s.length <= 50,000`.
- Every character is `a`, `b`, or `c`.
- Return the count, not the substrings themselves.

## Approach

Track the latest position of each character. At each right endpoint, every start at or before the earliest of those three positions is valid. Add that position plus one to the answer. Use `-1` for unseen characters so incomplete prefixes contribute zero.

Time: `O(n)`. Auxiliary space: `O(1)`.
