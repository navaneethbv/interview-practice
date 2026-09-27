# Maximum Frequency Stack

Implement a stack that removes the most frequent current value.
`push(val)` adds a value.
`pop()` removes and returns a value with maximum frequency; among tied values, choose the one most recently pushed among the remaining occurrences.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"], arguments = [[5], [7], [5], [7], [4], [5], [], [], [], []]
Output: [null, null, null, null, null, null, 5, 7, 5, 4]
Explanation: Frequency takes priority; recency resolves ties.
```

### Example 2

```text
Input: constructor = [], operations = ["push", "push", "pop", "pop"], arguments = [[1], [2], [], []]
Output: [null, null, 2, 1]
Explanation: Distinct values behave like an ordinary stack.
```

## Constraints

- 0 <= val <= 10^9
- At most 20,000 total push and pop calls occur.
- pop is called only when the structure is nonempty.
