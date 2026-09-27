# Delete Columns to Make Sorted II

Delete the same set of character positions from every string.
Return the fewest columns to delete so the resulting list of strings is in nondecreasing lexicographic order.
Individual strings do not need their letters sorted.

## Examples

### Example 1

```text
Input: strs = ["ca", "bb", "ac"]
Output: 1
Explanation: Delete the first column to obtain a,b,c.
```

### Example 2

```text
Input: strs = ["xc", "yb", "za"]
Output: 0
Explanation: The first column already establishes the correct row order.
```

## Constraints

- 1 <= strs.length <= 100.
- All strings have the same length from 1 through 100.
- Strings contain lowercase English letters.
