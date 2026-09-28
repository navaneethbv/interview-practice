## Intuition

The paths form a shallow key-value hierarchy, and each operation needs only exact path lookup.
Storing complete path strings is sufficient because a new path is valid precisely when its immediate parent is already stored.

## Brute force

Splitting every path into all components and rebuilding a tree for each operation adds unnecessary work.
A scan through every existing path to find the parent would also make operations linear in the number of stored paths.

## Approach

1. Keep a map from complete path strings to integer values.
2. For `createPath`, derive the parent by removing the final component.
3. Reject an existing path or a missing non-root parent.
4. Store the new value and return true; `get` returns the map value or -1.

## Walkthrough

In Example 1, `createPath("/a",1)` has parent `""`, representing the root, so it succeeds.
`createPath("/a/b",2)` finds `"/a"` in the map and succeeds.
`get("/a/b")` then returns 2.
In the second example, the parent of `"/a/b"` is `"/a"`, which was never created, so creation returns false and the later lookup returns -1.

## Complexity

Hash-map operations are expected O(1), while deriving a parent and storing a path costs O(L) for path length L because strings are inspected or copied.
The map stores O(p) paths and their string data, where p is the number of successful creations.

## Edge cases

Direct children such as `/a` use the root exception and need no stored empty-string entry.
Creating an existing path fails even if the new value differs.
Missing paths return -1 without changing the map.

## Common mistakes

Check the immediate parent, not merely a prefix such as `/a` for `/abc`.
Do not permit a nested path before its parent exists.
Keep constructor state per test instance so paths from another testcase cannot leak.

## Language notes

Python uses `rsplit` and `dict.get`, while Java uses `substring`, `HashMap`, and `getOrDefault`.
The Java design class keeps the required `FileSystem` constructor and operation names without imports or helper redefinitions.
