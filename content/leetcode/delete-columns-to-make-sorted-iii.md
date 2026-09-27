# Delete Columns to Make Sorted III

Delete the same set of column positions from every string so that the characters remaining inside each individual string are nondecreasing.
Return the fewest deleted columns.
The strings themselves need not be ordered relative to one another.

## Examples

### Example 1

```text
Input: strs = ["babca", "bbazb"]
Output: 3
Explanation: Two columns can be retained while keeping both rows individually sorted.
```

### Example 2

```text
Input: strs = ["abc", "bcd"]
Output: 0
Explanation: Every row is already nondecreasing.
```

## Constraints

- 1 <= strs.length <= 100.
- All strings have the same length from 1 through 100.
- Strings contain lowercase English letters.
