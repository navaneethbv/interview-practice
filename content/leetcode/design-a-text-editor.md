# Design a Text Editor

Implement a text editor with a cursor that starts at position 0 of an empty text.
`addText(text)` inserts `text` at the cursor and leaves the cursor after it.
`deleteText(k)` deletes up to `k` characters to the left of the cursor and returns how many were deleted.
`cursorLeft(k)` and `cursorRight(k)` move the cursor up to `k` positions and return the last `min(10, len)` characters to the left of the cursor, where `len` is the number of characters to its left.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- Text contains lowercase English letters.
- 1 <= k <= 40

## Examples

### Example 1

```text
Input: ops = ["addText", "deleteText", "addText", "cursorRight", "cursorLeft", "deleteText", "cursorLeft", "cursorRight"], args = [["leetcode"], [4], ["practice"], [3], [8], [10], [2], [6]]
Output: [null, 4, null, "etpractice", "leet", 4, "", "practi"]
Explanation: After typing leetpractice, the cursor moves left 8 to just after leet; deleting 10 removes only those 4 characters.
```

### Example 2

```text
Input: ops = ["deleteText", "cursorLeft", "addText", "cursorLeft"], args = [[3], [1], ["abcdefghijkl"], [1]]
Output: [0, "", null, "bcdefghijk"]
Explanation: Only the last 10 characters to the left of the cursor are returned.
```
