# Design In-Memory File System

Implement an in-memory filesystem rooted at /.
`mkdir(path)` creates a directory and any missing parent directories.
`addContentToFile(filePath, content)` creates a file or appends content to an existing file.
`readContentFromFile(filePath)` returns its entire content.
`ls(path)` returns immediate child names in lexicographic order for a directory, or a one-element list containing the basename for a file.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["ls", "mkdir", "addContentToFile", "ls", "readContentFromFile"], arguments = [["/"], ["/a/b"], ["/a/b/f", "hi"], ["/a/b"], ["/a/b/f"]]
Output: [[], null, null, ["f"], "hi"]
Explanation: Create nested directories and a file, then list and read it.
```

### Example 2

```text
Input: constructor = [], operations = ["addContentToFile", "addContentToFile", "readContentFromFile", "ls"], arguments = [["/x", "a"], ["/x", "b"], ["/x"], ["/x"]]
Output: [null, null, "ab", ["x"]]
Explanation: Appending preserves earlier content; listing a file gives its basename.
```

## Constraints

- All paths are absolute, contain lowercase English names, and have no trailing slash except /.
- Requested reads and listings exist; file parent directories exist before a file is created.
- A file and directory never share a path; operation sequences are valid.
- At most 300 operations occur per instance.
