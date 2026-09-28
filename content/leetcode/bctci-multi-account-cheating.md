# Multi-Account Cheating

Each entry of `users` is `[username, ip1, ip2, ...]`, listing the distinct IPs a user has connected from in no particular order.
Two users are suspicious when their sets of IPs are exactly the same.
Return whether any two users are suspicious.

## Examples

### Example 1

```text
Input: users = [["mike", "203.0.3.10", "208.51.0.5"], ["bob", "111.0.0.10", "222.0.0.5"], ["bob2", "222.0.0.5", "111.0.0.10"]]
Output: true
```

### Example 2

```text
Input: users = [["alice", "1.1.1.1"], ["bob", "2.2.2.2"]]
Output: false
```

## Constraints

- `0 <= users.length <= 10^5`
- Each user has between 1 and 10 IPs.
