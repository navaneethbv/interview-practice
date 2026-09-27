# Employee Importance

Each Employee object has an id, an importance value, and a list of direct subordinate IDs.
Return the total importance of the requested employee and all of their direct or indirect subordinates.
Employee IDs are unique, management relationships contain no cycles, and each employee has at most one direct manager.

Tests encode each employee as `[id, importance, subordinateIds]`; the harness supplies Employee objects to your method.

## Examples

### Example 1

```text
Input: employees = [[1, 5, [2, 3]], [2, 3, []], [3, 2, []]], id = 1
Output: 10
Explanation: Include the manager and both direct reports.
```

### Example 2

```text
Input: employees = [[1, 5, [2]], [2, -3, []]], id = 2
Output: -3
Explanation: Querying a leaf includes only that employee.
```

## Constraints

- 1 <= employees.length <= 2000.
- 1 <= employee.id <= 2000.
- -100 <= employee.importance <= 100.
- The requested id exists.
