# First Time All Connected

`V` computers are numbered from 0, and `cables` lists connections to add one at a time.
Return the index of the cable after which every computer can reach every other, or `-1` if that never happens.

## Examples

### Example 1

```text
Input: V = 4, cables = [[0, 2], [1, 3], [0, 1], [1, 2]]
Output: 2
```

### Example 2

```text
Input: V = 3, cables = [[0, 1]]
Output: -1
```

## Constraints

- `2 <= V <= 10^4` and `0 <= cables.length <= 10^5`
- Cables are distinct and never connect a computer to itself.
