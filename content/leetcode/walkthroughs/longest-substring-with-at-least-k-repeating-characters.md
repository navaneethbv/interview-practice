## Intuition
A valid substring cannot contain a character whose total frequency inside that substring is below `k`.
If a character is globally too rare in the current segment, every valid answer must lie entirely on one side of each occurrence of that character.
Splitting around such a character reduces the problem to independent segments.

## Brute force
Enumerating every substring and counting its characters takes O(n^2) candidate checks, with extra work to inspect each candidate.
That is too slow for strings of length 10,000.

## Approach

1. Count all letters in the current segment.
2. Return its length if every present letter reaches `k`.
3. Find a letter whose count is below `k` and use its occurrences as separators.
4. Recursively solve the pieces between separators and keep the maximum.
5. Java carries index bounds, while Python splits the segment into strings.

## Walkthrough

For Example 1, `s = "aaabb"` and `k = 3`, the counts are `a:3` and `b:2`.
The two `b` characters are invalid separators because they cannot appear in a qualifying substring.
The pieces are `"aaa"`, `""`, and `""`.
The first piece has three `a` characters, so it qualifies and contributes length 3.
For `s = "ababbc"` and `k = 2`, `c` is invalid in the initial segment, leaving `"ababb"`.
That segment has `a:2` and `b:3`, so its full length 5 is returned.

## Complexity
With a fixed 26-letter alphabet, counting a segment is linear in its length.
With alphabet size A, each recursive segment counts and scans its characters, giving O(A n) time because every split removes at least one deficient character type and A is at most 26.
Java passes index ranges, so it avoids copying substring contents and uses O(A^2) auxiliary space for count arrays across recursion depth bounded by A.
Python `split` creates new segment strings, so its total temporary string allocation can be O(A n) and recursive list or call storage can add O(A^2).

## Edge cases
If the segment length is less than `k`, it cannot qualify.
When `k` is 1, the entire input is immediately valid.
A character occurring exactly `k` times is allowed.

## Common mistakes
Do not split on every character; only deficient letters rule out a segment that spans them.
Do not treat a rare letter as merely reducing the score, because it makes any substring containing it invalid.
Keep the substring boundaries correct after consecutive separators.

## Language notes
The Python solution uses `Counter` and `split`.
The Java solution avoids substring copies by carrying `[start, end)` bounds and uses a helper to process the separated pieces.
