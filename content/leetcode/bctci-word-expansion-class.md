# Word Expansion Class

Implement `Checker(s)` with a method `expands_into(s2)` (`expandsInto` in Java).
It returns `true` when `s2` can be formed by adding exactly one letter to `s` and then reordering the letters.

## Examples

### Example 1

```text
Input: ctor = ["tea"], ops = ["expands_into", "expands_into", "expands_into"], args = [["tea"], ["team"], ["seam"]]
Output: [false, true, false]
```

### Example 2

```text
Input: ctor = [""], ops = ["expands_into", "expands_into"], args = [["a"], [""]]
Output: [true, false]
```

## Constraints

- `0 <= s.length, s2.length <= 10^5`
- All strings are lowercase English letters.
