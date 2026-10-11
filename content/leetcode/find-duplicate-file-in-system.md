# Find Duplicate File in System

Each entry of `paths` describes one directory: the directory path, a space, and then one or more files written as `name(content)` separated by spaces.
Return every group of files that have identical content, as lists of full paths (`directory/name`), including only groups with at least two files.
Groups and the paths inside them may be in any order.

Any order of the result is accepted.

## Constraints

- 1 <= paths.length <= 2 * 10^4
- File names in one directory are distinct.
- Content is non-empty and contains no spaces or parentheses.

## Examples

### Example 1

```text
Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"]
Output: [["root/a/1.txt", "root/c/3.txt"], ["root/a/2.txt", "root/c/d/4.txt", "root/4.txt"]]
Explanation: Two groups of files share content.
```

### Example 2

```text
Input: paths = ["root/a 1.txt(x)", "root/b 2.txt(y)"]
Output: []
Explanation: No content repeats.
```
