# Valid Word Abbreviation

An abbreviation can replace disjoint nonempty substrings of word with their lengths.
Digits in abbr form whole decimal counts; counts cannot have leading zeros and cannot skip past the end of the word.
Return whether abbr describes exactly word.

## Examples

### Example 1

```text
Input: word = "internationalization", abbr = "i18n"
Output: true
Explanation: The 18 middle letters are replaced by their count.
```

### Example 2

```text
Input: word = "apple", abbr = "a02e"
Output: false
Explanation: Counts cannot begin with zero.
```

## Constraints

- 1 <= word.length <= 20.
- 1 <= abbr.length <= 10.
- word contains lowercase letters; abbr contains lowercase letters and digits.
- Numeric counts fit a signed 32-bit integer.
