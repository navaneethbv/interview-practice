# Time Based Key-Value Store

Store multiple timestamped values for each string key.
`set(key, value, timestamp)` records a new value.
`get(key, timestamp)` returns the value stored at the greatest timestamp no larger than the requested time, or an empty string when no such value exists.
Timestamps supplied to `set` strictly increase across all calls.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["set", "get", "set", "get", "get"], args = [["color", "red", 2], ["color", 3], ["color", "blue", 5], ["color", 4], ["color", 5]]
Output: [null, "red", null, "red", "blue"]
Explanation: The value at time 2 remains visible until the update at time 5.
```

### Example 2

```text
Input: ctor = [], ops = ["get", "set", "get"], args = [["missing", 1], ["x", "a", 3], ["x", 2]]
Output: ["", null, ""]
Explanation: A missing key and a time before the first update both return an empty string.
```

## Constraints

- Keys and values contain 1 to 100 lowercase letters or digits.
- 1 <= timestamp <= 10000000.
- At most 200000 method calls occur per test.
