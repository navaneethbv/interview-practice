# Validate IP Address

Classify `queryIP` as `IPv4`, `IPv6`, or `Neither`.
IPv4 requires four decimal groups from 0 to 255 separated by dots, with no leading zeros unless the group is exactly 0.
IPv6 requires eight groups separated by colons, each containing one to four hexadecimal digits.
Compressed IPv6 forms using an empty group are not accepted.

## Constraints

- `1 <= queryIP.length <= 39`.
- The string contains ASCII letters, digits, dots, or colons.

## Examples

### Example 1

```text
Input: queryIP = "192.0.2.1"
Output: "IPv4"
Explanation: Four valid decimal groups have no leading zeros.
```

### Example 2

```text
Input: queryIP = "2001:db8:0:0:0:0:0:1"
Output: "IPv6"
Explanation: There are eight nonempty hexadecimal groups.
```
