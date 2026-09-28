# Most Shared Account

Each connection is `[ip, username]`, and every IP is distinct.
Return the username with the most connections.
If several tie, return the one whose first connection comes earliest; return `""` when there are no connections.

## Examples

### Example 1

```text
Input: connections = [["203.0.113.10", "mike"], ["208.51.100.25", "bob"], ["202.0.2.5", "mike"], ["203.0.113.15", "bob2"]]
Output: "mike"
```

### Example 2

```text
Input: connections = [["1.1.1.1", "alice"], ["1.1.1.2", "bob"], ["1.1.1.3", "alice"], ["1.1.1.4", "bob"]]
Output: "alice"
```

## Constraints

- `0 <= connections.length <= 10^5`
