# Range Module

Track covered real-number intervals.
`addRange(left,right)` covers [left,right), `removeRange(left,right)` removes coverage there, and `queryRange(left,right)` reports whether every point of that interval is covered.
The left endpoint is included and the right endpoint is excluded.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["addRange", "removeRange", "queryRange", "queryRange", "queryRange"], arguments = [[10, 20], [14, 16], [10, 14], [13, 15], [16, 20]]
Output: [null, null, true, false, true]
Explanation: Removal splits coverage while preserving both outer pieces.
```

### Example 2

```text
Input: constructor = [], operations = ["addRange", "addRange", "queryRange"], arguments = [[1, 3], [3, 5], [1, 5]]
Output: [null, null, true]
Explanation: Touching covered intervals join without a gap.
```

## Constraints

- 1 <= left < right <= 10^9
- At most 10,000 total method calls occur per instance.
