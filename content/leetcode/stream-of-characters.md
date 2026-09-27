# Stream of Characters

Initialize with a dictionary of words.
Each query appends one letter to a growing character stream and returns whether any nonempty suffix of the stream equals a dictionary word.
Earlier queries remain part of the stream.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- There are 1 to 2000 words of length 1 to 2000.
- Dictionary words and query letters are lowercase English letters.
- At most 40000 queries occur.

## Examples

### Example 1

```text
Input: ctor = [["ab", "bc"]], ops = ["query", "query", "query"], args = [["a"], ["b"], ["c"]]
Output: [false, true, true]
Explanation: After b the suffix ab matches; after c the suffix bc matches.
```

### Example 2

```text
Input: ctor = [["a"]], ops = ["query", "query"], args = [["a"], ["b"]]
Output: [true, false]
Explanation: A word must match the current ending of the stream.
```
