## Intuition

Tasks are in a fixed order, so the only choice is how long to wait before each one. Waiting longer than necessary never helps, so each task runs on the later of tomorrow and the first day its type is allowed again.

## Approach

1. Keep `ready[type]`, the first day that type may run.
2. For each task, its day is `max(previous day + 1, ready[type])`.
3. Set `ready[type] = day + space + 1`.
4. Return the last day.

## Walkthrough

In Example 1 with space 3, tasks 1 and 2 run on days 1 and 2. The next 1 is ready on day 5, so days 3 and 4 are breaks. The next 2 runs on day 6, task 3 on day 7, and the last 1 is ready on day 9.

## Complexity

- Time: O(n).
- Space: O(n).

## Edge cases

- Days can exceed 32-bit integers in principle, so use 64-bit counters.
- Different types never interfere.

## Common mistakes

- Simulating day by day, which can take far longer than the number of tasks.
- Setting the ready day to `day + space` instead of `day + space + 1`.
