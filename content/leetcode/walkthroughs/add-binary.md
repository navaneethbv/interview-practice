## Intuition

Binary addition has the same carry rule as decimal addition, but every column contains only zeroes and ones.
Process both strings from right to left so each `column_total` contains the two current digits plus `carry`.
The remainder modulo two is the output digit for that column, and integer division by two produces the next carry.

## Brute force

Converting the strings to arbitrary-precision integers and back takes O(L) time and O(L) temporary space for L input digits, but it depends on conversion behavior outside the digit algorithm.
Adding every possible pair of digits without carrying immediately would also require extra passes and makes the carry state harder to maintain.

## Approach

1. Set `left_index` and `right_index` to the final positions of `a` and `b`.
2. Continue while either string has digits or a final `carry` remains.
3. Add each available digit to `column_total`, append `column_total % 2`, and set `carry` to `column_total // 2`.
4. Reverse `digits`, because columns were produced from least significant to most significant.

## Walkthrough

Example 1 adds `a = "11"` and `b = "1"`.

| `left_index` | `right_index` | `column_total` | appended digit | `carry` |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 0 | 2 | 0 | 1 |
| 0 | -1 | 2 | 0 | 1 |
| -1 | -1 | 1 | 1 | 0 |

The collected digits are `"001"`, so reversing them returns `"100"`.

## Complexity

- Time: O(max(len(a), len(b))), because each input digit is read once.
- Space: O(max(len(a), len(b))), for the output digit list, including the final string representation.

## Edge cases

If one string is shorter, its missing columns contribute zero.
Inputs containing only zeroes produce the correct single zero without trimming a meaningful digit.
A final carry creates one extra leading one.
Very long strings never need conversion to a machine integer.

## Common mistakes

- Forgetting to process a remaining carry after both indices pass zero loses the leading digit.
- Advancing an index before reading its digit skips a column.
- Returning the collected digits without reversing produces the answer backwards.

## Language notes

Python stores output digits in a list and reverses an iterator before joining.
Java's `StringBuilder` receives digits in reverse order and uses `reverse()`.
Both references use integer arithmetic for a single binary column, so no numeric overflow depends on the input length.
