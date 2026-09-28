# String Join

Without a built-in join method, return the strings of `arr` concatenated in order with `s` between each adjacent pair.
Build the result in time linear in its length; repeated string concatenation in a loop can be quadratic.

## Examples

### Example 1

```text
Input: arr = ["join", "by", "space"], s = " "
Output: "join by space"
```

### Example 2

```text
Input: arr = [], s = "x"
Output: ""
```

## Constraints

- `0 <= s.length <= 500`
- `0 <= arr.length <= 10^5`
- The total length of the strings in `arr` is at most `10^5`.
