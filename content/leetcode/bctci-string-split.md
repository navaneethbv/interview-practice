# String Split

Without a built-in split method, split string `s` at every occurrence of the single character `c`.
Return the pieces in order, including empty pieces between adjacent delimiters and at either end.
An empty `s` produces an empty list.

## Examples

### Example 1

```text
Input: s = "split by space", c = " "
Output: ["split", "by", "space"]
```

### Example 2

```text
Input: s = "/home/./..//Documents/", c = "/"
Output: ["", "home", ".", "..", "", "Documents", ""]
```

## Constraints

- `0 <= s.length <= 10^6`
- `c` is exactly one character.
