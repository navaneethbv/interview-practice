# Maximum Profit in Job Scheduling

Job i runs from `startTime[i]` up to `endTime[i]` and pays `profit[i]`.
Choose jobs with no overlapping working times to maximize total profit.
A job may start exactly when a previous job ends.

## Examples

### Example 1

```text
Input: startTime = [1, 2, 3], endTime = [3, 4, 5], profit = [5, 6, 7]
Output: 12
Explanation: Choose the first and third jobs, which meet at time 3.
```

### Example 2

```text
Input: startTime = [1, 1], endTime = [2, 3], profit = [4, 9]
Output: 9
Explanation: The jobs overlap, so take the more profitable job.
```

## Constraints

- 1 <= startTime.length == endTime.length == profit.length <= 50,000
- 1 <= startTime[i] < endTime[i] <= 10^9
- 1 <= profit[i] <= 10,000
