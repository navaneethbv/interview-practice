## Intuition

A closing parenthesis should match an earlier unmatched opening parenthesis whenever one exists.
If none exists, that close forces the insertion of a new opening parenthesis.
After the scan, every remaining unmatched opening forces a closing insertion, so two counters describe all necessary additions.

## Brute force

Trying insertion positions and parenthesis choices explores many equivalent candidate strings and repeatedly checks their balance.
A stack-based baseline is simpler: record unmatched parentheses and count them afterward in O(n) time and O(n) space.
The stack contents are unnecessary because openings are interchangeable, so a count gives the same result with constant storage.

## Approach

1. Initialize `unmatched_open` and `missing_open` to zero.
2. For an opening parenthesis, increment the unmatched-opening count.
3. For a closing parenthesis with an available opening, decrement that count.
4. For a closing parenthesis without one, increment the missing-opening count.
5. Return the sum of both counts.

Matching an available opening cannot hurt a later match because every close needs exactly one preceding opening.
Each forced insertion fixes one unmatched parenthesis, establishing both a lower bound and an achievable answer.

## Walkthrough

Example 1 is `s = "())"`.

| Character | Unmatched openings | Missing openings |
| --- | --- | --- |
| `(` | 1 | 0 |
| first `)` | 0 | 0 |
| second `)` | 0 | 1 |

The first pair matches without additions.
The final close has no available opening, so inserting one before it is necessary.
The method returns `0 + 1 = 1`.

## Complexity

- Time: O(n), for one scan of the n characters.
- Space: O(1), because only counters and the iteration position are stored.

## Edge cases

An already balanced string returns zero.
All openings require one closing addition per character.
All closings require one opening addition per character.
For `)(`, two additions are needed even though the total counts of opening and closing parentheses are equal.

## Common mistakes

- Comparing only total character counts ignores their required order.
- Letting the unmatched-opening count become negative loses the distinction between earlier missing openings and later available ones.
- Returning only one counter forgets unmatched parentheses of the other kind.

## Language notes

Python iterates directly over the string; Java uses `charAt` and camel-case counter names.
Java avoids making a character array, preserving constant auxiliary space.
The statement permits only parentheses, so every non-opening character is a close.
