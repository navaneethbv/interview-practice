# Top K Frequent Words

Return the `k` most frequent distinct words.
Order them by decreasing frequency, breaking equal-frequency ties in lexicographically increasing order.

## Examples

### Example 1

```text
Input: words = ["i", "love", "i", "code", "love"], k = 2
Output: ["i", "love"]
Explanation: Both words occur twice, so i comes first alphabetically.
```

### Example 2

```text
Input: words = ["b", "a", "c"], k = 2
Output: ["a", "b"]
Explanation: All frequencies tie.
```

## Constraints

- 1 <= words.length <= 500
- 1 <= words[i].length <= 10; words use lowercase English letters.
- 1 <= k <= the number of distinct words
