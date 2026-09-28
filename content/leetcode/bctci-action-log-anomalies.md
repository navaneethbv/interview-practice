# Action Log Anomalies

A chronological support log has one entry per index: `agents[i]` performed `actions[i]` (`"open"` or `"close"`) on ticket `tickets[i]`.
A ticket is clean when all of the following hold, and anomalous otherwise:

- It is opened exactly once and closed exactly once, and the open comes first.
- The same agent opens and closes it.
- That agent performs no action on any other ticket between the open and the close.

Return every anomalous ticket number that appears in the log, in any order.

## Examples

### Example 1

```text
Input: agents = ["Drew", "Drew", "Drew"], actions = ["open", "close", "close"], tickets = [32, 2, 32]
Output: [2, 32]
```

### Example 2

```text
Input: agents = ["Alice", "Alice"], actions = ["open", "close"], tickets = [1, 1]
Output: []
```

## Constraints

- `0 <= log length <= 10^5`
- `1 <= tickets[i] < 10^6`
