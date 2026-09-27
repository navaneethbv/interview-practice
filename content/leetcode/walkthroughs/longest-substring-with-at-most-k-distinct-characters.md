## Intuition
A valid window can grow to the right while it contains at most k different characters.
When a new character exceeds that limit, move the left edge until the window is valid again.

## Brute force
A naive solution checks every pair of left and right endpoints and counts distinct characters in each substring.
There are O(n^2) windows and up to O(n) work to count each one.
The resulting time is O(n^3) with a direct recount, while copied substrings add O(n^2) total temporary character storage over the scan.

## Approach
1. Expand the right edge one character at a time.
2. Store a frequency for every character currently in the window.
3. While the number of keys exceeds k, decrement and remove characters from the left.
4. Record the largest valid width.

## Walkthrough
Example 1 is `s = "abaccc"` with `k = 2`.
The window grows through `a`, `ab`, `aba`, and `abac`.
Adding the first `c` makes three distinct characters, so removing `a`, then `b`, leaves `ac` with two distinct characters.
The next `c` gives `acc` with length 3.
The final `c` gives `accc` with length 4, so the result is 4.

## Complexity
Each character enters and leaves the window at most once, giving O(n) time.
The frequency map stores at most O(min(n, k)) distinct characters.
The algorithm uses O(min(n, k)) auxiliary space and does not copy substrings.

## Edge cases
When k is zero, every nonempty window is removed and the result is zero.
An empty string returns zero.
Repeated characters can make the entire string valid with k equal to one.

## Common mistakes
Counting total characters instead of distinct keys breaks repeated-character windows.
Failing to delete zero counts leaves the map larger than the actual distinct set.
Updating the answer before shrinking can record an invalid window.

## Language notes
Python uses a dictionary of integer frequencies.
Java uses `HashMap<Character, Integer>` and indexed `charAt`, so it avoids a character-array copy.
