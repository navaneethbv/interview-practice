## Intuition

An expression can be evaluated left to right when `total` stores the completed part and `sign` stores the pending operation.
Parentheses temporarily replace that state with a fresh expression state.
When a closing parenthesis arrives, its value is multiplied by the saved outer sign and added to the saved outer total.

## Brute force

Repeatedly extracting and evaluating the innermost parenthesized substring can rescan the surrounding expression after each replacement, taking O(n²) time in deeply nested input.
Using a language expression evaluator would also violate the problem requirement and would not expose how unary minus is handled.

## Approach

1. Build `number` digit by digit while scanning `s`.
2. On `+` or `-`, add the completed number using the current `sign`, then record the new sign.
3. On `(`, push `(total, sign)` and reset the inner expression to zero with positive sign.
4. On `)`, finish the inner number and restore the saved outer state.
5. Add the final pending number after the scan.

## Walkthrough

Example 1 is `s = "1 + (2 - 3)"`.

| character | `total` | `sign` | `number` or stack action |
| --- | ---: | ---: | --- |
| `1` | 0 | 1 | `number = 1` |
| `+` | 1 | 1 | commit 1, clear `number` |
| `(` | 0 | 1 | push `(1, 1)`, reset inner state |
| `2` | 0 | 1 | `number = 2` |
| `-` | 2 | -1 | commit 2, clear `number` |
| `3` | 2 | -1 | `number = 3` |
| `)` | 0 | -1 | inner value -1, combine with saved `(1, 1)` |

The code leaves `sign` at -1 after `)`, but `number` is zero, so the final expression value is `0 + (-1 * 0) = 0`.

## Complexity

- Time: O(n), because every character is processed once.
- Space: O(n), for the stack of nested parenthesis states.

## Edge cases

Spaces are ignored because they match none of the action branches.
An initial minus sign sets `sign` before the first number is committed.
Nested parentheses create one stack entry per nesting level.
Large valid expressions remain linear in their character count.

## Common mistakes

- Forgetting to commit `number` before changing `sign` drops the preceding term.
- Restoring only `total` after `)` loses the sign applied by an outer minus.
- Popping an empty stack assumes invalid input, while the spec guarantees valid expressions.

## Language notes

Python stores each saved state as a tuple and uses arbitrary-precision integers.
Java stores the same two integers in an `int[]` because the harness already provides collection imports.
The statement guarantees that Java's signed 32-bit arithmetic is sufficient for every intermediate value.
