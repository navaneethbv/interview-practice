# Design Hit Counter

Implement a counter for events recorded in seconds.
`hit(timestamp)` records one hit.
`getHits(timestamp)` returns hits in the last 300 seconds, including the current second and excluding hits at timestamp - 300.
Calls arrive in nondecreasing timestamp order, and multiple hits may share a timestamp.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["hit", "hit", "getHits", "getHits"], arguments = [[1], [2], [300], [301]]
Output: [null, null, 2, 1]
Explanation: At time 301, the hit at time 1 falls outside the window.
```

### Example 2

```text
Input: constructor = [], operations = ["hit", "hit", "getHits"], arguments = [[10], [10], [10]]
Output: [null, null, 2]
Explanation: Hits in the same second are counted separately.
```

## Constraints

- 1 <= timestamp <= 2^31 - 1
- At most 300 method calls occur per instance.
