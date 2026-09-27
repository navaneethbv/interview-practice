# Minimum Cost to Convert String I

Change source into target using character replacement rules.
Rule i replaces one occurrence of original[i] with changed[i] for cost[i].
You may apply any rule repeatedly and chain several replacements at one position.
Return the smallest total cost, or -1 if some required change is impossible.

## Examples

### Example 1

```text
Input: source = "abc", target = "cba", original = ["a", "b", "c", "b"], changed = ["b", "c", "b", "a"], cost = [2, 3, 4, 1]
Output: 10
Explanation: The first position costs 2+3; the last costs 4+1; the middle is unchanged.
```

### Example 2

```text
Input: source = "a", target = "z", original = ["a"], changed = ["b"], cost = [2]
Output: -1
Explanation: No rule sequence reaches z.
```

## Constraints

- 1 <= source.length == target.length <= 100000
- All characters are lowercase English letters.
- 1 <= original.length == changed.length == cost.length <= 2000
- original[i] != changed[i]; 1 <= cost[i] <= 1000000
