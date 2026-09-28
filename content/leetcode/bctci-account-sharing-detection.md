# Account Sharing Detection

Each connection is `[ip, username]`, and every IP is distinct.
A username is shared when it appears in two or more connections.
Return the IP of the earliest connection, in list order, whose username is shared, or `""` if no username is shared.

## Examples

### Example 1

```text
Input: connections = [["203.0.113.10", "mike"], ["198.51.100.25", "bob"], ["192.0.2.5", "mike"], ["203.0.113.15", "bob2"]]
Output: "203.0.113.10"
```

### Example 2

```text
Input: connections = [["1.0.0.1", "ann"], ["1.0.0.2", "bo"]]
Output: ""
```

## Constraints

- `0 <= connections.length <= 10^5`
- Usernames are 1 to 30 lowercase letters.
