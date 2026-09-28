# Product of Alphabetical Sums

The alphabetical sum of a word adds the alphabet positions of its letters, so `"abz"` has sum 1 + 2 + 26 = 29.
Given words of 1 to 3 lowercase letters, return whether some three words, possibly the same word more than once, have alphabetical sums whose product equals `target`.

## Examples

### Example 1

```text
Input: words = ["abc", "fg", "hij", "klm", "nop", "qrs", "vwx"], target = 1620
Output: true
Explanation: "abc", "abc", and "nop" give 6 * 6 * 45.
```

### Example 2

```text
Input: words = ["a", "b", "c"], target = 7
Output: false
```

## Constraints

- `0 <= words.length <= 10^5`
- `1 <= target <= 10^6`
