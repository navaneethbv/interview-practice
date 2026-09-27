# Fancy Sequence

Maintain a sequence initially empty.
append(val) adds an element, addAll(inc) increments every existing element, and multAll(m) multiplies every existing element.
All values are kept modulo 1,000,000,007.
getIndex(idx) returns the current element at idx or -1 if the index is beyond the sequence.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["append", "addAll", "append", "multAll", "getIndex", "getIndex"], arguments = [[2], [3], [7], [2], [0], [1]]
Output: [null, null, null, null, 10, 14]
Explanation: The sequence changes from [2] to [5] to [5,7] to [10,14].
```

### Example 2

```text
Input: constructor = [], operations = ["getIndex", "addAll", "append", "getIndex"], arguments = [[0], [9], [4], [0]]
Output: [-1, null, null, 4]
Explanation: Adding to an empty sequence does not affect later appends.
```

## Constraints

- 1 <= val, inc <= 100
- 2 <= m <= 100
- 0 <= idx <= 100000
- At most 100000 calls across all methods.
