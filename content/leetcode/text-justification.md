# Text Justification

Pack words greedily into lines of exactly `maxWidth` characters.
For each nonfinal line, distribute spaces as evenly as possible between words, placing any extra spaces in earlier gaps.
A line with one word and the final line are left aligned with single spaces between words and padding on the right.
Do not split words.

## Examples

### Example 1

```text
Input: words = ["Pack", "a", "small", "bag"], maxWidth = 10
Output: ["Pack     a", "small bag "]
Explanation: The first line stretches its one gap; the final line pads on the right.
```

### Example 2

```text
Input: words = ["one"], maxWidth = 5
Output: ["one  "]
Explanation: A single final word receives trailing padding.
```

## Constraints

- 1 <= words.length <= 300
- Each word is nonempty and has length at most maxWidth.
- 1 <= maxWidth <= 100; words contain no spaces.
