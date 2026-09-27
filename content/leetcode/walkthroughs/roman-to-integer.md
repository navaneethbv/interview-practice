## Intuition

Roman symbols normally add their values, but a smaller symbol immediately before a larger one must be subtracted.
At each `index`, compare the current symbol with the next symbol to decide which rule applies.
The final symbol is always added because there is no larger symbol after it in the input.

## Brute force

Replacing every subtractive pair with a special value and then summing the remaining symbols takes O(n) time and O(n) rewritten-string space.
The direct comparison avoids that extra representation while handling the same local rule.

## Approach

1. Store each Roman symbol's value in `values`.
2. For each `symbol`, set `is_subtractive` when its value is smaller than the next value.
3. Add the signed value to `total` and return the accumulated result.

## Walkthrough

Example 1 processes `s = "XIV"`.

| `index` | symbol | next symbol | contribution | `total` |
| ---: | --- | --- | ---: | ---: |
| 0 | X | I | 10 | 10 |
| 1 | I | V | -1 | 9 |
| 2 | V | none | 5 | 14 |

The subtractive pair `IV` therefore contributes 4, giving 14.

## Complexity

- Time: O(n), because each of the n symbols is inspected once.
- Space: O(1), because the fixed Roman value table does not grow with the input.

## Edge cases

A one-symbol numeral is added directly.
Subtractive pairs are recognized only when the next value is larger.
The final symbol is handled without a special second pass.
The valid input constraint keeps the returned value within the integer range.

## Common mistakes

- Subtracting whenever a symbol is followed by any symbol changes ordinary sequences such as `VI`.
- Forgetting the final symbol undercounts every numeral.
- Using string replacement rules can mishandle overlapping pair boundaries.

## Language notes

Python uses a dictionary keyed by characters.
Java uses a fixed 128-entry array indexed by the character code, which avoids boxing and map lookups.
Both references use the same `is_subtractive` comparison and signed contribution.
