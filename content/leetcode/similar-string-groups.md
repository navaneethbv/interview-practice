# Similar String Groups

Strings are directly similar if they are equal or if swapping two positions in one makes it equal to the other.
Treat direct similarity as an undirected connection and return the number of connected groups.
Every input string is an anagram of every other input string.

## Constraints

- There are 1 to 300 strings, each length 1 to 300.
- Characters are lowercase English letters.

## Examples

### Example 1

```text
Input: strs = ["tars", "rats", "arts", "star"]
Output: 2
Explanation: The first three connect; star is separate.
```

### Example 2

```text
Input: strs = ["ab", "ba"]
Output: 1
Explanation: One swap connects both words.
```
