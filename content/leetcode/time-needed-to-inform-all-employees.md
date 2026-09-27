# Time Needed to Inform All Employees

Employees form a management tree rooted at headID.
The head receives news at time 0.
After an employee receives it, they spend informTime[employee] minutes before all their direct reports receive it simultaneously.
Return the time when every employee knows the news.

## Examples

### Example 1

```text
Input: n = 4, headID = 0, manager = [-1, 0, 1, 1], informTime = [2, 3, 0, 0]
Output: 5
Explanation: The head informs employee 1 at minute 2, who informs employees 2 and 3 at minute 5.
```

### Example 2

```text
Input: n = 1, headID = 0, manager = [-1], informTime = [0]
Output: 0
Explanation: The only employee already knows.
```

## Constraints

- 1 <= n <= 100000
- manager[headID] == -1; every other employee has exactly one manager.
- 0 <= informTime[i] <= 1000; employees without reports have informTime 0.
