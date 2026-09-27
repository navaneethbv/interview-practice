# Exclusive Time of Functions

A single processor runs functions with ids 0 through n-1, allowing nested calls.
Logs have the form id:start:timestamp or id:end:timestamp.
A start occurs at the beginning of its second and an end at the end of its second.
Return each function's total running time excluding time spent inside called functions.

## Examples

### Example 1

```text
Input: n = 2, logs = ["0:start:0", "1:start:2", "1:end:5", "0:end:6"]
Output: [3, 4]
Explanation: Function 1 uses seconds 2 through 5; function 0 uses 0, 1, and 6.
```

### Example 2

```text
Input: n = 1, logs = ["0:start:3", "0:end:3"]
Output: [1]
Explanation: Starting and ending in one second consumes one unit.
```

## Constraints

- 1 <= n <= 100
- 1 <= logs.length <= 500
- Logs describe valid nested execution and have nondecreasing timestamps.
- 0 <= timestamps <= 10^9
