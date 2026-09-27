# Design Search Autocomplete System

Initialize the system with historical sentences and their usage counts.
`input(c)` extends the current search prefix and returns up to three matching sentences, ordered by decreasing count and then lexicographically.
A space sorts before letters.
On #, record the completed nonempty sentence once, reset the prefix, and return an empty list.

## Examples

### Example 1

```text
Input: constructor = [["cat", "car", "cart"], [3, 2, 2]], operations = ["input", "input", "input"], arguments = [["c"], ["a"], ["#"]]
Output: [["cat", "car", "cart"], ["cat", "car", "cart"], []]
Explanation: Count ranks cat first; lexical order resolves car versus cart.
```

### Example 2

```text
Input: constructor = [["a"], [1]], operations = ["input", "input", "input"], arguments = [["b"], ["#"], ["b"]]
Output: [[], [], ["b"]]
Explanation: Finishing b stores it for future searches.
```

## Constraints

- 1 <= sentences.length == times.length <= 100
- Initial sentences are distinct and contain lowercase letters and spaces.
- 1 <= times[i] <= 50
- Inputs are lowercase letters, spaces, or #; each completed sentence is nonempty.
- At most 5,000 input calls occur per instance.
