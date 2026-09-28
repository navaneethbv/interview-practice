# Longest Word

Return the longest word in `words` that can be formed by concatenating at least two words from the list.
The same word may be used more than once, but a word cannot be built from itself alone.
If several qualify, return the alphabetically smallest; return `""` when none do.

## Examples

### Example 1

```text
Input: words = ["cat", "banana", "dog", "nana", "walk", "walker", "dogwalker"]
Output: "dogwalker"
```

### Example 2

```text
Input: words = ["a", "b"]
Output: ""
```

## Constraints

- `0 <= words.length <= 1,000`
- `1 <= words[i].length <= 30`
- Words are distinct lowercase strings.
