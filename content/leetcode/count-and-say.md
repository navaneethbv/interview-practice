# Count and Say

Start with the string 1.
To form each next term, replace every maximal run of equal digits with its count followed by its digit.
Return the nth term, counting the starting string as term 1.

## Examples

### Example 1

```text
Input: n = 4
Output: "1211"
Explanation: The terms are 1, 11, 21, then 1211.
```

### Example 2

```text
Input: n = 5
Output: "111221"
Explanation: Read 1211 as one 1, one 2, and two 1s.
```

## Constraints

- 1 <= n <= 30
