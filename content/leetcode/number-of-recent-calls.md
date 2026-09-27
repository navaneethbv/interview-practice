# Number of Recent Calls

`ping(t)` records a request at time t and returns the number of recorded requests with timestamps in the inclusive interval `[t-3000,t]`.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- Times are strictly increasing positive integers no larger than 1000000000.
- At most 10000 calls occur.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["ping", "ping", "ping"], args = [[1], [3001], [3002]]
Output: [1, 2, 2]
Explanation: At 3001 the request at 1 is still included; at 3002 it expires.
```

### Example 2

```text
Input: ctor = [], ops = ["ping", "ping"], args = [[1], [5000]]
Output: [1, 1]
Explanation: The earlier request lies outside the window.
```
