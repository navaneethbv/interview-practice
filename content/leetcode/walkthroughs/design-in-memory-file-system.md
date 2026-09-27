## Intuition

The reference stores canonical absolute paths for directories and files.
`ls` can therefore identify immediate children by removing the requested path prefix and rejecting names that still contain a slash.
The design is simple for the bounded operation count, while a trie would optimize deep path traversal at the cost of a different representation.

## Brute force

A flat path scan is already the direct baseline, but scanning every path and sorting all matching names on every listing costs O(P * L + M * L log M), where P is stored paths, L is maximum path length, and M is returned children.
A trie can find a directory node in O(L) and enumerate its children, but would require changing the existing path representation.

## Approach

1. Keep `/` in `directories` and store file content in `files` keyed by `filePath`.
2. In `mkdir`, build each cumulative `current_path` and add it.
3. In `addContentToFile`, append to the existing content string or create it.
4. In `ls`, return a file basename directly, or scan all paths under the directory prefix.
5. Sort the collected immediate names before returning them.

## Walkthrough

Example 1 creates `/a/b`, adds `/a/b/f` with `hi`, then lists and reads it.

| operation | stored state | output |
| --- | --- | --- |
| `ls("/")` | only `/` | `[]` |
| `mkdir("/a/b")` | directories `/`, `/a`, `/a/b` | null |
| `addContentToFile("/a/b/f", "hi")` | file content `hi` | null |
| `ls("/a/b")` | immediate child `f` | `["f"]` |
| `readContentFromFile("/a/b/f")` | content unchanged | `"hi"` |

## Complexity

- Time: `mkdir` is O(L²) in the worst case because it builds and hashes every cumulative path, `addContentToFile` is O(L + oldContent + appendedContent), `readContentFromFile` is O(L) for key hashing, and `ls` is O(P * L + M * L log M) for P stored paths, maximum path length L, and M returned names.
- Space: O(P * L + C) for stored path strings and file content totaling C characters, plus O(P + M * L) temporary listing state from `all_paths` and relative names.

## Edge cases

Listing a file returns only its basename rather than scanning descendants.
Listing `/` uses the root prefix without introducing a double slash.
Repeated `mkdir` calls are idempotent because directories are stored in a set.
Repeated file writes preserve earlier content by concatenating strings.

## Common mistakes

- Returning descendants with slashes violates immediate-child listing.
- Omitting parent directories from `mkdir` breaks later listings.
- Returning file content from `ls` confuses files with directories.

## Language notes

Python uses sets, dictionaries, and a set of candidate names before sorting.
Java uses `HashSet`, `HashMap`, and `TreeSet` to collect names in sorted order.
Both references follow the design spec's `FileSystem` class and method names.
