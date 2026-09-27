## Intuition

Typing a normal character appends it, while `#` removes the most recent surviving character when one exists.
A stack models that editor behavior directly for each input string.
The two final character sequences are equal exactly when the edited strings are equal.

## Brute force

Repeatedly deleting a character from the middle of an immutable string can shift O(n) characters per backspace and take O(n²) time.
Building a mutable stack performs each append and removal in constant amortized time.

## Approach

1. In `typed`, create an empty `typed_characters` stack.
2. Append ordinary characters.
3. Pop for `#` when the stack is nonempty.
4. Return whether `typed(s)` and `typed(t)` match.

## Walkthrough

Example 1 compares `s = "ab#c"` and `t = "ad#c"`.

| input | actions | final stack |
| --- | --- | --- |
| `ab#c` | append a, append b, pop b, append c | `ac` |
| `ad#c` | append a, append d, pop d, append c | `ac` |

The edited strings match, so the result is true.

## Complexity

- Time: O(len(s) + len(t)), because each character is processed once.
- Space: O(len(s) + len(t)) for the two edited-string representations.

## Edge cases

A leading `#` does nothing because the stack is empty.
Several backspaces can erase all prior characters.
An input without backspaces is returned unchanged.
The comparison handles different raw strings that edit to the same result.

## Common mistakes

- Treating a leading backspace as an error violates the editor behavior.
- Comparing raw inputs instead of edited stacks misses equivalent results.
- Removing the oldest character instead of the latest character reverses stack semantics.

## Language notes

Python uses a list and `pop`.
Java uses `StringBuilder`, shortening it by one character for each valid backspace.
Both helpers return the final text representation before comparison.
