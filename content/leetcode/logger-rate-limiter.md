# Logger Rate Limiter

`shouldPrintMessage(timestamp,message)` returns true if this message has not been allowed during the preceding 10 seconds.
When true is returned, record the current timestamp as the last allowed print time.
Rejected requests do not extend the waiting period.
Track each message independently.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage"], arguments = [[1, "hello"], [2, "hello"], [11, "hello"]]
Output: [true, false, true]
Explanation: A repeated message is allowed again exactly ten seconds later.
```

### Example 2

```text
Input: constructor = [], operations = ["shouldPrintMessage", "shouldPrintMessage"], arguments = [[5, "a"], [5, "b"]]
Output: [true, true]
Explanation: Different messages have independent limits.
```

## Constraints

- 0 <= timestamp <= 10^9; timestamps are nondecreasing.
- 1 <= message.length <= 30
- At most 10,000 calls occur per instance.
