# Find The Celebrity

Among people numbered `0` through `n - 1`, a celebrity knows nobody else and is known by every other person.
Use `knows(a, b)` to determine whether person `a` knows person `b`.
Return the celebrity's number, or `-1` when none exists.
Ignore whether someone knows themself.
`knowsMatrix` configures the API and is not passed to your method; row `a`, column `b` contains 1 exactly when `knows(a, b)` is true.

## Examples

```text
Input: n = 3, knowsMatrix = [[1,1,0],[0,1,0],[1,1,1]]
Output: 1
Explanation: Everyone else knows 1, and 1 knows nobody else.
```

```text
Input: n = 2, knowsMatrix = [[1,0],[0,1]]
Output: -1
Explanation: Neither person is known by the other.
```

## Constraints

- 1 <= n <= 100
- knowsMatrix is an n by n matrix containing 0 or 1.
- Aim for O(n) API calls.
