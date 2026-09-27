# Snapshot Array

Create an array of the requested length initialized to zeros.
`set(index,val)` updates the current value.
`snap()` saves the current array and returns consecutive snapshot ids starting at zero.
`get(index,snap_id)` reads the value at that saved snapshot, unaffected by later updates.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- Length ranges from 1 to 50000; indices are valid.
- Values range from 0 to 1000000000.
- get references an already created snapshot.
- At most 50000 operations occur.

## Examples

### Example 1

```text
Input: ctor = [2], ops = ["set", "snap", "set", "get", "snap", "get"], args = [[0, 5], [], [0, 8], [0, 0], [], [0, 1]]
Output: [null, 0, null, 5, 1, 8]
Explanation: Snapshot 0 keeps 5 despite the later update.
```

### Example 2

```text
Input: ctor = [1], ops = ["snap", "get"], args = [[], [0, 0]]
Output: [0, 0]
Explanation: Unwritten cells start at zero.
```
