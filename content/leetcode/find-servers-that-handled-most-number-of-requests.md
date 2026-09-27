# Find Servers That Handled Most Number of Requests

There are k servers numbered 0 through k-1.
Request i arrives at arrival[i] and keeps its server busy for load[i] time units.
Try server i modulo k, then scan cyclically for the first available server.
Drop the request if every server is busy.
A server finishing at the arrival time is available.
Return all server ids with the maximum number of handled requests, in any order.

## Constraints

- `1 <= k, arrival.length <= 100000`.
- Arrival times are strictly increasing and positive.
- Load lengths are positive; both arrays have equal lengths.

## Examples

### Example 1

```text
Input: k = 2, arrival = [1, 2, 3], load = [2, 2, 2]
Output: [0]
Explanation: Server 0 finishes exactly at time 3 and handles the third request.
```

### Example 2

```text
Input: k = 3, arrival = [1, 2, 3], load = [10, 10, 10]
Output: [0, 1, 2]
Explanation: Each server handles one request.
```
