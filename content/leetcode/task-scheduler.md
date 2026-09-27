# Task Scheduler

Schedule all unit-time tasks on one processor.
Two executions of the same letter must have at least n intervening time slots, which may hold other tasks or be idle.
Tasks may be reordered freely.
Return the shortest total schedule length, including idle slots.

## Examples

### Example 1

```text
Input: tasks = ["A", "A", "A", "B", "B"], n = 2
Output: 7
Explanation: One schedule is A B idle A B idle A.
```

### Example 2

```text
Input: tasks = ["A", "A", "A", "B"], n = 0
Output: 4
Explanation: With no cooldown, every time slot can do work.
```

## Constraints

- 1 <= tasks.length <= 10000.
- Every task is an uppercase English letter.
- 0 <= n <= 100.
