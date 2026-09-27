# Unique Morse Code Words

Encode each lowercase word by concatenating its letters' standard International Morse codes without separators.
Return the number of distinct resulting encodings.
For a through z, the codes are .-, -..., -.-., -.., ., ..-., --., ...., .., .---, -.-, .-.., --, -., ---, .--., --.-, .-., ..., -, ..-, ...-, .--, -..-, -.--, --...

## Examples

### Example 1

```text
Input: words = ["gin", "zen", "gig", "msg"]
Output: 2
Explanation: gin and zen share an encoding; gig and msg share another.
```

### Example 2

```text
Input: words = ["a"]
Output: 1
Explanation: One word produces one encoding.
```

## Constraints

- 1 <= words.length <= 100
- 1 <= words[i].length <= 12
- Words contain lowercase English letters.
