# Simplify Path

Convert an absolute Unix-style path to its canonical form.
A period means the current directory, two periods mean the parent directory, and repeated slashes act as one separator.
Moving above the root leaves you at the root.
Other names, including three periods, are ordinary directory names.
The result starts with one slash and has no trailing slash unless it is the root.

## Examples

### Example 1

```text
Input: path = "/a//b/../c/"
Output: "/a/c"
Explanation: Remove empty segments and move from b to its parent.
```

### Example 2

```text
Input: path = "/../../"
Output: "/"
Explanation: Parent operations cannot move above root.
```

## Constraints

- 1 <= path.length <= 3000.
- path begins with /.
- Names may contain English letters, digits, periods, or underscores.
