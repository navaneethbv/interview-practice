# Sentence Similarity II

Two equal-length sentences are similar when every pair of corresponding words is similar.
A word is always similar to itself.
The pairs in `similarPairs` define a symmetric, transitive relation: words connected through any chain of pairs are similar.
Return whether the sentences are similar.

## Constraints

- Each sentence contains 1 to 1000 words.
- There are 0 to 2000 pairs.
- Words contain 1 to 20 lowercase English letters.

## Examples

### Example 1

```text
Input: sentence1 = ["fast", "car"], sentence2 = ["quick", "auto"], similarPairs = [["fast", "rapid"], ["rapid", "quick"], ["car", "auto"]]
Output: true
Explanation: Similarity follows the chain fast, rapid, quick.
```

### Example 2

```text
Input: sentence1 = ["a"], sentence2 = ["a", "b"], similarPairs = []
Output: false
Explanation: Different sentence lengths cannot match.
```
