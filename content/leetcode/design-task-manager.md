# Design Task Manager

Store tasks described by [userId,taskId,priority].
add creates a new task, edit changes an existing task's priority, and rmv deletes an existing task.
execTop removes the task with greatest priority, breaking ties by greatest taskId, and returns its userId.
It returns -1 when empty.

## Examples

### Example 1

```text
Input: constructor = [[[1, 10, 5], [2, 20, 5]]], operations = ["execTop", "edit", "execTop", "execTop"], arguments = [[], [10, 9], [], []]
Output: [2, null, 1, -1]
Explanation: Task 20 wins the priority tie, then task 10 is edited and executed.
```

### Example 2

```text
Input: constructor = [[[3, 1, 9]]], operations = ["rmv", "add", "execTop"], arguments = [[1], [7, 1, 2], []]
Output: [null, null, 7]
Explanation: A removed task ID can be reused for a new owner.
```

## Constraints

- 1 <= initial tasks.length <= 100000
- 0 <= userId, taskId <= 100000; 0 <= priority, newPriority <= 1000000000
- At most 200000 operations.
- Task IDs are unique among current tasks; edit and rmv refer to existing IDs.
