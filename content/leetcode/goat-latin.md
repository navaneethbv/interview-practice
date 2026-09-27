# Goat Latin

Transform each space-separated word.
If it begins with a vowel, keep its letters in place; otherwise move its first letter to the end.
Append ma and then a repeated as many times as the word's one-based position.
Vowel detection is case-insensitive; preserve letter case.

## Examples

### Example 1

```text
Input: sentence = "I speak"
Output: "Imaa peaksmaaa"
Explanation: The vowel-starting I stays in place; speak becomes peaks before suffixes.
```

### Example 2

```text
Input: sentence = "Apple"
Output: "Applemaa"
Explanation: A vowel-starting first word receives maa.
```

## Constraints

- 1 <= sentence.length <= 150
- Words contain English letters and are separated by single spaces, with no leading or trailing spaces.
