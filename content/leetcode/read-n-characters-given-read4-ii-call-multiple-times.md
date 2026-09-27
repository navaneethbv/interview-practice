# Read Characters Across Multiple Calls

Implement `read(buf, n)` using the supplied `read4(buf4)` API.
The API consumes up to four characters from the file and returns the count copied into its buffer.
Your method must copy at most `n` characters into `buf` and return the actual count.
Calls share the same `Solution` instance and file position, so save any characters read ahead for the next call.
The judge checks only the returned-count prefix of each output buffer.
Each testcase starts a new file; the `file` field configures the API.

## Examples

```text
Input: file = "abcde", requested counts = [1,3,2]
Output: [["a"],["b","c","d"],["e"]]
Explanation: Reading ahead during the first call must not lose b, c, or d.
```

```text
Input: file = "xy", requested counts = [4,2]
Output: [["x","y"],[]]
Explanation: The second call reaches a file position that is already at the end.
```

## Constraints

- File contents contain at most 1000 ASCII characters.
- Each requested count is between 1 and 1000.
- Each buffer has capacity for at least its requested count.
- A testcase may make multiple calls; exhausting the file must not reset its position.
