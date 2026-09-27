# Maximum Number of Weeks for Which You Can Work

Each week, complete one remaining milestone from a project.
You cannot work on the same project in consecutive weeks.
Return the maximum number of weeks you can work.

## Examples

### Example 1

```text
Input: milestones = [1, 2, 3]
Output: 6
Explanation: The project choices can be interleaved until all milestones are complete.
```

### Example 2

```text
Input: milestones = [5, 2, 1]
Output: 7
Explanation: The dominant project can be separated by the three other milestones only four times.
```

## Constraints

- 1 <= milestones.length <= 100,000
- 1 <= milestones[i] <= 10^9
