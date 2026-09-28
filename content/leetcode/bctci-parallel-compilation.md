# Parallel Compilation

Package `i` takes `seconds[i]` to compile and can start only after every package in `imports[i]` has finished.
Any number of packages can compile at once, and the dependencies contain no cycles.
Return the minimum time to compile every package.

## Examples

### Example 1

```text
Input: seconds = [10, 20, 30], imports = [[], [], [0, 1]]
Output: 50
```

### Example 2

```text
Input: seconds = [10, 20, 30], imports = [[], [], []]
Output: 30
```

## Constraints

- `1 <= n <= 10^5`
- `1 <= seconds[i] <= 10^4`
