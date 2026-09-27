# Design File System

Store an integer value at each created path.
`createPath(path, value)` succeeds only if the path does not already exist and its parent path exists, except that a direct child of the root needs no explicit parent creation.
`get(path)` returns its stored value, or -1 when the path is absent.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["createPath", "createPath", "get"], args = [["/a", 1], ["/a/b", 2], ["/a/b"]]
Output: [true, true, 2]
Explanation: Creating /a establishes the parent needed for /a/b, whose stored value is 2.
```

### Example 2

```text
Input: ctor = [], ops = ["createPath", "get"], args = [["/a/b", 1], ["/a/b"]]
Output: [false, -1]
Explanation: The parent /a has not been created, so creation fails and the requested path remains absent.
```

## Constraints

- Paths contain one or more slash-prefixed lowercase names and have no trailing slash.
- The root path / and the empty path are not passed as inputs.
- 1 <= value <= 1000000000.
- At most 10000 operations occur per test.
