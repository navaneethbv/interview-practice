# Design a Number Container System

Containers are identified by index and each holds at most one number.
`change(index, number)` puts `number` in the container at `index`, replacing what was there.
`find(number)` returns the smallest index that currently holds `number`, or -1 if none does.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- 1 <= index, number <= 10^9

## Examples

### Example 1

```text
Input: ops = ["find", "change", "change", "change", "change", "find", "change", "find"], args = [[10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
Output: [-1, null, null, null, null, 1, null, 2]
Explanation: Index 1 holds 10 until it is changed to 20, after which index 2 is the smallest.
```

### Example 2

```text
Input: ops = ["change", "change", "find"], args = [[4, 7], [4, 8], [7]]
Output: [null, null, -1]
Explanation: Replacing a number removes it from that index.
```
