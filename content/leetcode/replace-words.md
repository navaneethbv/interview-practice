# Replace Words

Replace each word of sentence with the shortest dictionary entry that is a prefix of that word.
Leave a word unchanged when no root matches.
Return the words joined with single spaces.

## Constraints

- dictionary has 1 to 1000 lowercase roots of length 1 to 100.
- sentence contains lowercase words separated by single spaces, with no leading or trailing space.

## Examples

### Example 1

```text
Input: dictionary = ["cat", "bat"], sentence = "the cattle met bats"
Output: "the cat met bat"
Explanation: Both matching words are replaced by their roots.
```

### Example 2

```text
Input: dictionary = ["a", "ab"], sentence = "abc able"
Output: "a a"
Explanation: The shortest root takes precedence.
```
