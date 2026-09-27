## Intuition

Store indices in `stack` so the top marks the most recent unmatched boundary.
The sentinel `-1` represents the position before the current valid region.
After matching a closing parenthesis, the distance from the current index to the boundary below the match is the valid length.

## Brute force

Checking every substring and validating its balance takes O(n²) or worse.
A dynamic program can avoid some checks, but the boundary stack directly captures every unmatched opening or invalid closing position.

## Approach

1. Initialize `stack = [-1]`.
2. Push an opening parenthesis index.
3. For a closing parenthesis, pop its matching opening boundary.
4. If the stack is empty, push the closing index as a new invalid boundary.
5. Otherwise update `longest` with `index - stack[-1]`.

## Walkthrough

Example 1 is `s = ")()())"`.

| index and character | stack after action | `longest` |
| --- | --- | ---: |
| 0, `)` | `[0]` | 0 |
| 1, `(` | `[0, 1]` | 0 |
| 2, `)` | `[0]` | 2 |
| 3, `(` | `[0, 3]` | 2 |
| 4, `)` | `[0]` | 4 |
| 5, `)` | `[5]` | 4 |

The boundary at index 0 lets indices 1 through 4 measure the substring `()()`.

## Complexity

- Time: O(n), because every character causes one push or pop.
- Space: O(n), for the unmatched-index stack in the worst case.

## Edge cases

An empty string has no characters and returns zero.
An unmatched closing parenthesis resets the boundary.
An all-opening string never produces a valid length.
Nested and adjacent valid groups are measured by the same boundary rule.

## Common mistakes

- Starting the stack empty makes a valid prefix length off by one.
- Leaving an invalid closing index out allows a later group to bridge across it.
- Computing length before popping the matched opening index uses the wrong boundary.

## Language notes

Python uses a list of integer indices.
Java uses `ArrayDeque<Integer>`, which provides the same stack operations without recursion.
Both methods report only the maximum length, so they do not need to store substring text.
