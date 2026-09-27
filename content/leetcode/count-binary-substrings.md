# Count Binary Substrings

Count nonempty substrings containing equally many zeros and ones, with all zeros in one consecutive group and all ones in another.
The two groups may occur in either order.
Count substrings at different positions separately.

## Examples

### Example 1

```text
Input: s = "00110011"
Output: 6
Explanation: Each neighboring pair of runs contributes one or two balanced substrings.
```

### Example 2

```text
Input: s = "10101"
Output: 4
Explanation: Each adjacent pair forms one valid substring.
```

## Constraints

- 1 <= s.length <= 100000.
- s contains only 0 and 1.
