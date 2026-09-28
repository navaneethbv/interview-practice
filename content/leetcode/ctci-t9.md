# T9

On an old phone keypad, 2 maps to `abc`, 3 to `def`, 4 to `ghi`, 5 to `jkl`, 6 to `mno`, 7 to `pqrs`, 8 to `tuv`, and 9 to `wxyz`.
Given a digit sequence and a list of valid lowercase words, return the words that the sequence could spell.
Keep the words in the order they appear in `words`.

## Examples

### Example 1

```text
Input: digits = "8733", words = ["tree", "used", "true", "treg", "apple"]
Output: ["tree", "used"]
```

### Example 2

```text
Input: digits = "2", words = ["b", "d"]
Output: ["b"]
```

## Constraints

- `1 <= digits.length <= 50`
- `digits` contains only `2` to `9`.
- `0 <= words.length <= 10,000`
- Words are distinct.
