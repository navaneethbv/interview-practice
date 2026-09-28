# URLify

Replace every space in the first `trueLength` characters of `value` with `%20`.
Ignore any padding characters after that logical length.
Return the transformed string without modifying the input.
Count characters and `trueLength` in Unicode code points, so an emoji such as `🙂` counts as one character.

## Examples

### Example 1

```text
Input: value = "Mr John Smith    ", trueLength = 13
Output: "Mr%20John%20Smith"
```

### Example 2

```text
Input: value = "a b  ", trueLength = 3
Output: "a%20b"
```

## Constraints

- `0 <= trueLength <= value.length`
- The logical portion may contain spaces at either end.
- Characters after `trueLength` are padding and must not appear in the result.
