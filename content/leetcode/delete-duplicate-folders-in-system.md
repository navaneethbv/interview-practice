# Delete Duplicate Folders in System

Each entry of `paths` is the absolute path to a folder, given as a list of folder names.
Two folders (not necessarily at the same level) are identical if they contain the same non-empty set of identical subfolders with the same structure.
Mark every folder that is identical to another folder, and delete all marked folders together with their subfolders, all at once.
Return the paths of the folders that remain, in any order.

Any order of the result is accepted.

## Constraints

- 1 <= paths.length <= 2 * 10^4
- Every folder on a path also appears as its own entry.
- No two entries are the same path.

## Examples

### Example 1

```text
Input: paths = [["a"], ["c"], ["d"], ["a", "b"], ["c", "b"], ["d", "a"]]
Output: [["d"], ["d", "a"]]
Explanation: Folders a and c both contain only an empty folder b, so both are deleted.
```

### Example 2

```text
Input: paths = [["a"], ["a", "x"], ["b"], ["b", "x"], ["b", "x", "y"]]
Output: [["a"], ["a", "x"], ["b"], ["b", "x"], ["b", "x", "y"]]
Explanation: a/x is empty but b/x contains y, so nothing is identical.
```
