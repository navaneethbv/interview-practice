# Product of Two Run-Length Encoded Arrays

Each pair [value,frequency] represents that many consecutive copies of value.
The two encoded arrays expand to the same length.
Return the run-length encoding of their coordinatewise product, merging adjacent runs whenever their product values match.

## Examples

### Example 1

```text
Input: encoded1 = [[1, 3], [2, 3]], encoded2 = [[6, 3], [3, 3]]
Output: [[6, 6]]
Explanation: Both product segments equal 6 and must merge.
```

### Example 2

```text
Input: encoded1 = [[2, 2], [3, 1]], encoded2 = [[4, 1], [5, 2]]
Output: [[8, 1], [10, 1], [15, 1]]
Explanation: The run boundaries do not line up.
```

## Constraints

- 1 <= encoded1.length, encoded2.length <= 100,000
- 1 <= values, frequencies <= 10,000
- Expanded lengths are equal.
