# Jewels and Stones

Every character in `jewels` identifies a valuable stone type.
Count how many occurrences in `stones` are jewel types.
Letter case matters.

## Examples

### Example 1

```text
Input: jewels = "aA", stones = "aAAbbbb"
Output: 3
Explanation: One lowercase a and two uppercase A occurrences count.
```

### Example 2

```text
Input: jewels = "z", stones = "ZZ"
Output: 0
Explanation: Uppercase Z is different from lowercase z.
```

## Constraints

- 1 <= jewels.length, stones.length <= 50
- Both strings use English letters; jewels contains no duplicate characters.
