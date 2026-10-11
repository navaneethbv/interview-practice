## Intuition

All edits happen at the cursor. Splitting the text there into a left stack and a reversed right stack makes insertion, deletion and moving the cursor push and pop operations at the stack tops.

## Approach

1. `addText` pushes characters onto the left stack.
2. `deleteText(k)` pops up to k characters from the left stack.
3. `cursorLeft(k)` moves up to k characters from the left stack to the right stack; `cursorRight` moves them back.
4. Return the last up to 10 characters of the left stack.

## Walkthrough

In Example 1, typing leetcode and deleting 4 leaves leet. Typing practice gives leetpractice with the cursor at the end, so moving right does nothing and returns etpractice. Moving left 8 leaves leet on the left, and deleting 10 removes those 4 characters.

## Complexity

- Time: O(k) per call.
- Space: O(text length).

## Edge cases

- Deleting more characters than exist deletes what is there.
- Moving past either end stops at the end.
- Fewer than 10 characters to the left return all of them.

## Common mistakes

- Storing the text as one string and slicing on every edit, which is O(n) per character.
- Returning text to the right of the cursor.
