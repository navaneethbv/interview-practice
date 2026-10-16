## Intuition

Count valid substrings by their right endpoint rather than constructing each substring.
For a fixed endpoint, the only question is how far right the starting position may move while retaining all three letters.
The most recent occurrence of each letter determines that boundary.

## Brute force

Try every starting position and extend the ending position while tracking the letters encountered.
This takes `O(n^2)` time, even though the alphabet has only three characters.
It is useful as an independent oracle on short inputs, but not for a string of length 50,000.

## Approach

Keep an array `last` with the most recent indices of `a`, `b`, and `c`.
Initialize all entries to `-1` so an unseen letter is distinguishable from a letter at index zero.
At each `index`, update the entry for the current character.
Let `earliest` be the minimum of the three latest indices.
Every start from zero through `earliest` produces a valid substring ending here.
There are exactly `earliest + 1` such starts.
When a character is still absent, the minimum is `-1`, so this expression contributes zero without a special branch.
Add each contribution to `total`.
Each substring has one right endpoint, so no substring is counted twice.

## Walkthrough

For Example 1, `s = "abcabc"`.
At indices zero and one, at least one letter is missing, so neither endpoint contributes anything.
At index two, `last` is `[0, 1, 2]`, contributing one substring.
At index three, the new `a` changes it to `[3, 1, 2]`, contributing two.
The next two updates contribute three and four.
The final `total` is `1 + 2 + 3 + 4 = 10`.

## Complexity

The reference performs one pass and examines a fixed array of three indices each time.
Time is `O(n)` and auxiliary space is `O(1)`.
No substrings are allocated.

## Edge cases

A string containing only one or two distinct characters contributes zero throughout.
A long prefix of one repeated letter can create several valid starts when the other two letters finally appear.
The order of the letters does not matter.

## Common mistakes

Adding only one when all letters are present misses earlier valid starts.
Using the maximum latest index admits substrings that omit a letter.
Initializing the indices to zero incorrectly treats unseen letters as present.

## Language notes

Python integers grow automatically.
Java's signed integer is sufficient: even the total number of substrings at the maximum length is less than 2.15 billion.
Both implementations use a three-element array and subtract the code point of `a` to select an entry.
