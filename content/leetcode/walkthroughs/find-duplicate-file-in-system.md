## Intuition

Duplicate detection is grouping by a key: the file content. Parse every file into its full path and content, put paths in a map keyed by content, and report the keys with several paths.

## Approach

1. Split each entry on spaces: the first token is the directory, the rest are files.
2. Split each file at '(' into name and content, dropping the trailing ')'.
3. Append `directory/name` to the content's group.
4. Return groups with more than one path.

## Walkthrough

In Example 1, content abcd groups root/a/1.txt and root/c/3.txt, and efgh groups three files.

## Complexity

- Time: O(total input length).
- Space: O(total input length).

## Edge cases

- A content that appears once is not a duplicate group.
- Files in different directories can share a name.

## Common mistakes

- Grouping by file name instead of content.
- Including the closing parenthesis in the content key.
