# IP to CIDR

Return the shortest list of CIDR blocks that covers exactly the `n` consecutive IPv4 addresses starting at `ip`, no more and no fewer.
A CIDR block `a.b.c.d/k` covers every address whose first `k` bits match `a.b.c.d`, which must have its remaining bits set to 0.
Return the blocks in increasing address order.

## Constraints

- ip is a valid IPv4 address.
- 1 <= n <= 1000
- The range does not go past 255.255.255.255.

## Examples

### Example 1

```text
Input: ip = "255.0.0.7", n = 10
Output: ["255.0.0.7/32", "255.0.0.8/29", "255.0.0.16/32"]
Explanation: Blocks of 1, 8 and 1 addresses cover 255.0.0.7 through 255.0.0.16.
```

### Example 2

```text
Input: ip = "117.145.102.62", n = 8
Output: ["117.145.102.62/31", "117.145.102.64/30", "117.145.102.68/31"]
Explanation: Alignment limits the first block to 2 addresses.
```
