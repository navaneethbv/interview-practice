# Maximum Number of Tasks You Can Assign

Each task needs at least its listed strength, and each worker can complete at most one task.
You may give at most pills workers one pill each, increasing their strength by strength.
Return the largest number of tasks that can be assigned.

## Examples

### Example 1

```text
Input: tasks = [3, 2, 1], workers = [0, 3, 3], pills = 1, strength = 1
Output: 3
Explanation: Boost the worker with strength 0 to handle task 1; the others handle tasks 2 and 3.
```

### Example 2

```text
Input: tasks = [5, 4], workers = [0, 0, 0], pills = 1, strength = 5
Output: 1
Explanation: Only one worker can be strengthened enough.
```

## Constraints

- 1 <= tasks.length, workers.length <= 50000
- 0 <= tasks[i], workers[i], strength <= 1000000000
- 0 <= pills <= workers.length
