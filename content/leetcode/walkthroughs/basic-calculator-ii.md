## Intuition

Addition and subtraction can wait until the end, but multiplication and division must update the most recent term immediately.
Store those signed terms in `terms`, so summing them later applies the correct precedence.
Appending a sentinel plus operator lets the final number use the same operator-processing branch.

## Brute force

Repeatedly evaluating each multiplication or division substring and rebuilding the expression can rescan the string and reach O(n²) time.
An operator stack or direct term list processes each completed number once while respecting precedence.

## Approach

1. Build `number` from consecutive digits while scanning `s`.
2. When a nonspace operator arrives, apply the previous `operator` to `number`.
3. Append positive or negative terms for plus and minus, or replace the latest term for multiplication and division.
4. Reset `number`, store the new operator, and sum `terms` after the sentinel.

## Walkthrough

Example 1 evaluates `s = "3+2*2"`.

| completed number | previous operator | `terms` after applying | next operator |
| ---: | --- | --- | --- |
| 3 | `+` | `[3]` | `+` |
| 2 | `+` | `[3,2]` | `*` |
| 2 | `*` | `[3,4]` | `+` sentinel |

Summing `[3,4]` returns 7.

## Complexity

- Time: O(n), because each character is scanned once and each term is summed once.
- Space: O(n), for the signed term stack in the worst case of only additions.

## Edge cases

Spaces are ignored without interrupting number construction.
Division truncates toward zero, matching the reference's signed absolute-value division in Python and Java integer division.
The sentinel processes the final number even when the input ends with a digit.
Multiplication and division update only the latest term.

## Common mistakes

- Summing immediately after multiplication applies operators from left to right incorrectly.
- Forgetting the final sentinel loses the last number.
- Python floor division would round negative results down, so the reference divides absolute values and restores the sign.

## Language notes

Python keeps a list of terms and implements truncation toward zero explicitly.
Java uses `ArrayDeque<Integer>` and Java integer division, which already truncates toward zero.
Both methods rely on the statement's guarantee that intermediate values fit the return type.
