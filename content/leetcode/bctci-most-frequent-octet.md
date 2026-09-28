# Most Frequent Octet

Each string in `ips` is a distinct IPv4 address such as `"10.0.0.1"`.
Return the most common first octet as a string.
If several tie, return the one that appears first in `ips`; return `""` for an empty list.

## Examples

### Example 1

```text
Input: ips = ["203.0.113.10", "208.51.100.5", "202.0.2.5", "203.0.113.5"]
Output: "203"
```

### Example 2

```text
Input: ips = ["10.0.0.1", "10.0.0.2", "192.168.1.1"]
Output: "10"
```

## Constraints

- `0 <= ips.length <= 10^5`
