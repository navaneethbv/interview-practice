## Intuition

The separator belongs between adjacent input entries, including empty entries, but not before the first or after the last.
Build the output incrementally in a mutable buffer so appending does not repeatedly copy the entire accumulated prefix.
One final conversion produces the immutable result string.

## Brute force

Repeatedly assign the current result plus another word and separator.
For immutable strings, growing prefixes may be copied again at every iteration, producing quadratic work in the total output size.

## Approach

Visit the input strings in their original order.
For every entry after index zero, append the separator first.
Then append all characters of that entry.
Python uses a character list as its buffer, while Java uses `StringBuilder`.
After the loop, convert the buffer to the result string.
The Python reference uses an empty-separator join only for this final character-buffer conversion; its placement of the requested separator is implemented explicitly rather than delegated to joining the original word list.
Java implements both buffering and final conversion through its builder API.

## Walkthrough

Example 1 begins with an empty buffer and appends `join` without a leading separator.
Before the second entry, it appends one space and then `by`, creating `join by`.
Before the third entry, it appends another space and then `space`.
The completed result is `join by space`, with exactly two separators for three entries and no extra characters at either end.

## Complexity

Let n be the number of entries and L the final output length, including inserted separators.
Both references take O(n + L) time and O(L) buffer/output space.
The n term matters when many entries and the separator are empty, making L zero despite an input list to traverse.

## Edge cases

An empty array returns an empty string.
A single entry needs no separator.
Empty entries still occupy positions and therefore still create separators between adjacent entries.

## Common mistakes

Do not decide separator placement based on whether the current word is empty.
Counting only input-word characters understates cost when the separator is long.

## Language notes

Python's `extend` adds individual characters to its list.
Java's builder appends whole strings and expands its internal capacity amortized over the output.
