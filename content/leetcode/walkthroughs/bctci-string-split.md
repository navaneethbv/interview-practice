## Intuition

Delimiters define boundaries between pieces.
Track the beginning of the current piece and emit the characters before each encountered delimiter.
A zero-length interval is a legitimate empty piece, so adjacent or boundary delimiters require no special suppression.

## Approach

Return an empty list immediately for an empty input string, following this problem's explicit convention.
For nonempty input, initialize `start` to zero and scan every character.
When the character equals c, append the substring from start up to, but excluding, the delimiter's index.
Then set start to the next index.
After scanning, append the final suffix from start through the end, even when that suffix is empty.
This final append ensures a trailing delimiter creates a trailing empty piece.
Every nondelimiter character appears in exactly one emitted interval, and each delimiter separates two neighboring pieces.

## Walkthrough

Example 1 splits `split by space` using a space delimiter.
The first space at index five emits `split` and moves start to six.
The next space at index eight emits `by` and moves start to nine.
The scan reaches the end without another delimiter, so the final suffix is `space`.
The returned list is `["split", "by", "space"]` in original order.
No trimming or other character normalization is performed.

## Complexity

For n input characters, scanning takes O(n) time.
The emitted substrings collectively contain at most n characters, so copying them also takes O(n) total time in these runtimes.
Output storage is O(n), including piece-list entries; auxiliary scalar state is O(1).

## Edge cases

A nonempty string containing only delimiters yields one more empty piece than the number of delimiters.
No delimiters produces a one-element list containing the original content.
Empty input is specially defined to return `[]`, not `[""]`.

## Common mistakes

Do not discard empty pieces or forget the final suffix.
The delimiter is a literal single character, not a regular expression or a set of separator characters.

## Language notes

Python uses half-open slices.
Java uses `substring` with the same exclusive end convention and extracts the single delimiter character with `charAt(0)`.
