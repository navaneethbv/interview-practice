# Letter Combinations of a Phone Number

Use the telephone keypad mapping 2=abc, 3=def, 4=ghi, 5=jkl, 6=mno, 7=pqrs, 8=tuv, and 9=wxyz.
Return every string formed by choosing one mapped letter for each digit in order.
Return an empty list for an empty input.
The result list may be in any order.

## Examples

### Example 1

```text
Input: digits = "2"
Output: ["a", "b", "c"]
Explanation: Each letter on key 2 is a possible result.
```

### Example 2

```text
Input: digits = "22"
Output: ["aa", "ab", "ac", "ba", "bb", "bc", "ca", "cb", "cc"]
Explanation: Each position independently chooses a letter from abc.
```

## Constraints

- 0 <= digits.length <= 4
- Every character is a digit from 2 through 9.
