# Minimum Initial Energy to Finish Tasks

Each task is [actual,minimum]: you need at least minimum energy to start it and spend actual energy when it finishes.
Choose any order and return the least initial energy that lets you complete every task.

## Examples

### Example 1

```text
Input: tasks = [[1, 2], [2, 4], [4, 8]]
Output: 8
Explanation: Perform the tasks in reverse order, leaving 4, 2, then 1 energy.
```

### Example 2

```text
Input: tasks = [[3, 3], [2, 2]]
Output: 5
Explanation: The total energy spent is sufficient.
```

## Constraints

- 1 <= tasks.length <= 100000
- 1 <= actual <= minimum <= 10000
