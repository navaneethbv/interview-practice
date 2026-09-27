# Distribute Money to Maximum Children

Distribute all money dollars among children so every child receives at least one dollar and no child receives exactly four dollars.
Maximize the number receiving exactly eight dollars.
Return that maximum, or -1 when no valid distribution exists.

## Constraints

- `1 <= money <= 200`; `2 <= children <= 30`.

## Examples

### Example 1

```text
Input: money = 16, children = 2
Output: 2
Explanation: Give each child eight dollars.
```

### Example 2

```text
Input: money = 12, children = 2
Output: 0
Explanation: An eight-dollar share would leave a forbidden four-dollar share.
```
