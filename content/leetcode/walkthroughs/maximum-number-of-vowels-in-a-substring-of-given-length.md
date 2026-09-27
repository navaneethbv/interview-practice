## Intuition

When a fixed-size window moves one position, only its entering and leaving characters change the vowel count.
A sliding window therefore finds the maximum without recounting every substring.

## Brute force

Counting vowels separately in every length-`k` substring costs `O(nk)` time.
The rolling count reduces this to one pass.

## Approach

1. Keep `count` for the current window and add the character at `index`.
2. Once the window exceeds length `k`, subtract the character at `index - k`.
3. After the first complete window, update `best`.
4. Return the largest count.

## Walkthrough

For Example 1, `s = "abciiidef"` and `k = 3`.
The first window `abc` contains one vowel.
The next window `bci` still has one, `cii` has two, and the window `iii` reaches count 3.
Later windows do not exceed it, so the result is `3`.

## Complexity

The window scan takes `O(n)` time.
The vowel set or string and counters use `O(1)` extra space.

## Edge cases

If no character is a vowel, every complete window has count zero.
When `k` equals the string length, exactly one window is evaluated.

## Common mistakes

- Subtracting the outgoing character before the window reaches size `k` removes a character too early.
- Counting `y` as a vowel contradicts the statement.
- Forgetting to update only complete windows reports a partial prefix.

## Language notes

Python uses a vowel set, while Java checks membership with `String.indexOf`.
The boolean arithmetic in Python contributes integer increments because `True` and `False` act as 1 and 0.
