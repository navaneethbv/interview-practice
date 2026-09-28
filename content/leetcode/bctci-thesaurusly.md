# Thesaurusly

`synonyms` lists entries `[word, synonym1, synonym2, ...]`.
Every word of `sentence` that has an entry must be replaced by one of its synonyms; other words stay unchanged.
Return every sentence that can be formed, in any order.

## Examples

### Example 1

```text
Input: sentence = "one does not simply walk into mordor", synonyms = [["walk", "stroll", "hike", "wander"], ["simply", "just", "merely"]]
Output: 6 sentences such as "one does not just stroll into mordor"
```

### Example 2

```text
Input: sentence = "walk", synonyms = [["walk", "stroll"]]
Output: ["stroll"]
```

## Constraints

- The sentence has at most 100 words; there are at most 8 entries with at most 6 synonyms each.
