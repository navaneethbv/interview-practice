## Intuition

Each delimiter ends the current piece and begins the next one.
Tracking the start of the current piece lets the scan emit exact substrings, including zero length pieces when two boundaries are adjacent.

## Brute force

Appending characters into a temporary string one at a time can create repeated copies with immutable strings.
The reference instead records boundaries and slices each finished piece once, without invoking a built in split operation.

## Approach

Return an empty list immediately for empty `s`.
Set `start = 0`, then scan characters with their indices.
At each delimiter, append `s[start:index]` and set `start = index + 1`.
After scanning, append the remaining suffix even when it is empty.

## Walkthrough

Example 1 scans `split by space` with a space delimiter.
The first delimiter at index 5 emits `split` and moves start to 6.
The delimiter at index 8 emits `by` and moves start to 9.
The final suffix is `space`, giving three pieces in order.

## Complexity

Scanning takes O(n), and the copied substrings contain at most n characters in total.
Including their list entries, output space is O(n) in the worst case.
The scan itself uses O(1) auxiliary indexing state.

## Edge cases

Leading and trailing delimiters produce leading and trailing empty pieces.
Adjacent delimiters produce an empty middle piece.
If no delimiter appears, return the entire nonempty input as one piece.
An empty input specifically returns `[]`, not `[""]`.

## Common mistakes

Do not discard empty slices or forget the final suffix.
Do not treat the delimiter as a regular expression.
After emitting a piece, skip exactly the delimiter's position so it does not become part of the next piece.

## Language notes

Python iterates Unicode code points and slices by those indices.
Java's reference uses `charAt` and `c.charAt(0)`, so its delimiter handling assumes one UTF-16 code unit.
Supplementary Unicode delimiters require different Java indexing to match Python's character behavior.
