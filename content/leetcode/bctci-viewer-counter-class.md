# Viewer Counter Class

Implement `ViewerCounter(window)` for a live stream, tracking viewers of types `"guest"`, `"follower"`, and `"subscriber"`.

- `join(t, v)` records that a viewer of type `v` joined at time `t`.
- `get_viewers(t, v)` (`getViewers` in Java) returns how many viewers of type `v` joined during `[t - window, t]`, inclusive.

Each call's timestamp is at least as large as every earlier call's timestamp.
Construct one instance per test and run the operations in order; `join` produces null.

## Examples

### Example 1

```text
Input: ctor = [10], ops = ["join", "join", "join", "get_viewers", "get_viewers"], args = [[1, "subscriber"], [2, "follower"], [3, "follower"], [10, "follower"], [13, "follower"]]
Output: [null, null, null, 2, 1]
```

### Example 2

```text
Input: ctor = [1], ops = ["get_viewers"], args = [[5, "guest"]]
Output: [0]
```

## Constraints

- At most `10^5` operations.
- `1 <= window <= 10^5`
