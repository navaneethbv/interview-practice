# Excel Sheet Column Title

Convert a positive column number to spreadsheet letters: 1 is A, 26 is Z, 27 is AA, and so on.
The alphabet uses A through Z with no zero digit.

## Examples

### Example 1

```text
Input: columnNumber = 28
Output: "AB"
Explanation: After AA, the next column is AB.
```

### Example 2

```text
Input: columnNumber = 701
Output: "ZY"
Explanation: The letters encode 26 times 26 plus 25.
```

## Constraints

- 1 <= columnNumber <= 2^31 - 1
