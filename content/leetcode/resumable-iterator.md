# Resumable Multi-File Iterator

A dataset is split into `files`, each an array of values (possibly empty). Iterate over every value in file order, then by position within the file.
`hasNext()` reports whether values remain and `next()` returns the next value.
`getState()` returns a checkpoint: the number of values consumed so far.
`setState(state)` resumes from a checkpoint previously returned by `getState`, so that iteration continues exactly where it was when the checkpoint was taken.
This simulates pausing a long-running job and resuming it after a restart.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- 1 <= files.length <= 10^4 and total values <= 10^5
- next is only called when hasNext is true.
- setState only receives values returned by getState.

## Examples

### Example 1

```text
Input: ctor = [[[1, 2], [], [3]]], ops = ["next", "getState", "next", "next", "hasNext", "setState", "next"], args = [[], [], [], [], [], [1], []]
Output: [1, 1, 2, 3, false, null, 2]
Explanation: After one value the checkpoint is 1; resuming there continues with 2, skipping the empty file correctly.
```

### Example 2

```text
Input: ctor = [[[], []]], ops = ["hasNext", "getState"], args = [[], []]
Output: [false, 0]
Explanation: Empty files contain nothing to iterate.
```
