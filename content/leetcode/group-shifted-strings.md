# Group Shifted Strings

Group strings that can be transformed into one another by repeatedly shifting every letter forward by the same amount, wrapping z back to a.
For example, az and ba differ by a uniform shift of one.
Return each group once, preserving input occurrences; group order and order within groups do not matter.

## Examples

### Example 1

```text
Input: strings = ["ab", "bc", "az", "ba", "a"]
Output: [["ab", "bc"], ["az", "ba"], ["a"]]
Explanation: The adjacent-letter offsets distinguish the groups.
```

### Example 2

```text
Input: strings = ["a", "z"]
Output: [["a", "z"]]
Explanation: Any one-letter string can shift to any other.
```

## Constraints

- 1 <= strings.length <= 200.
- 1 <= strings[i].length <= 50.
- Strings contain lowercase English letters.
