# Task Scheduler II

You must complete `tasks` in the given order, one task per day; `tasks[i]` is the task's type.
After completing a task of some type, you must wait at least `space` days before completing another task of the same type.
You may take breaks. Return the minimum number of days needed to finish every task.

## Constraints

- 1 <= tasks.length <= 10^5
- 1 <= tasks[i] <= 10^9
- 1 <= space <= tasks.length

## Examples

### Example 1

```text
Input: tasks = [1, 2, 1, 2, 3, 1], space = 3
Output: 9
Explanation: Breaks are needed before the second 1 and the third 1.
```

### Example 2

```text
Input: tasks = [5, 8, 8, 5], space = 2
Output: 6
Explanation: The second 8 must wait two days.
```
