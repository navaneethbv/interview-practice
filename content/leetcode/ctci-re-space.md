# Re-Space

A document lost all its spaces and punctuation, and it is now one lowercase string `sentence`.
Insert spaces so that as many characters as possible belong to words from `dictionary`.
Return the smallest possible number of unrecognized characters.

## Examples

### Example 1

```text
Input: dictionary = ["looked", "just", "like", "her", "brother"], sentence = "jesslookedjustliketimherbrother"
Output: 7
Explanation: "jess" and "tim" are not in the dictionary.
```

### Example 2

```text
Input: dictionary = [], sentence = "abc"
Output: 3
```

## Constraints

- `0 <= dictionary.length <= 150`
- `1 <= dictionary[i].length <= 100`
- `0 <= sentence.length <= 1,000`
- All strings are lowercase English letters.
