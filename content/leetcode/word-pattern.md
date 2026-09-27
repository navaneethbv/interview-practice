# Word Pattern

Split s into words at its spaces.
Return whether pattern characters correspond bijectively to those words: repeated letters require the same word, and different letters require different words.
The number of words must equal the pattern length.

## Constraints

- Pattern has 1 to 300 lowercase letters.
- s contains lowercase words separated by single spaces, with no leading or trailing space.

## Examples

### Example 1

```text
Input: pattern = "abba", s = "red blue blue red"
Output: true
Explanation: a consistently means red and b means blue.
```

### Example 2

```text
Input: pattern = "ab", s = "red red"
Output: false
Explanation: Different pattern letters cannot map to one word.
```
