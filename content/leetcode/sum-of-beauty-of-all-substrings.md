# Sum of Beauty of All Substrings

The beauty of a substring is its largest character frequency minus its smallest nonzero character frequency.
Return the sum of beauty over all nonempty contiguous substrings of s.

## Constraints

- s contains 1 to 500 lowercase English letters.

## Examples

### Example 1

```text
Input: s = "aab"
Output: 1
Explanation: Only aab has unequal nonzero frequencies.
```

### Example 2

```text
Input: s = "abc"
Output: 0
Explanation: Every character in every substring occurs once.
```
