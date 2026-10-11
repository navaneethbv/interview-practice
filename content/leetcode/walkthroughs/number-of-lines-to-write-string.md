## Intuition

Each letter either fits on the current line or starts a new one, and there is no choice to make, so a single pass simulating the writing is enough.

## Approach

1. Start with one line of width 0.
2. For each letter, if adding its width exceeds 100, start a new line.
3. Add the width to the current line.
4. Return the line count and the last width.

## Walkthrough

With every letter 10 pixels wide, ten letters fill a line exactly. Twenty-six letters use two full lines and 60 pixels of a third.

## Complexity

- Time: O(n).
- Space: O(1).

## Edge cases

- A line can be filled to exactly 100 pixels.
- The answer always has at least one line because s is non-empty.

## Common mistakes

- Starting a new line when the width equals 100 instead of when it would exceed 100.
