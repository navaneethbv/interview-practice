## Intuition

A line first chooses the largest consecutive group of words that fits.
Nonfinal lines distribute extra spaces across gaps from left to right.
The final line and every single-word line are left-justified and padded on the right.

## Brute force

A naive method could try every possible line ending and then repair spacing after the choice.
That repeats width checks and makes it easy to place extra spaces incorrectly.
Greedy line packing chooses the longest valid group once and formats it directly.

## Approach

1. Advance an end pointer while adding the next word and one required separator.
2. Count the words and letters in the selected line.
3. Left-justify when this is the final line or the line has one word.
4. Otherwise divide extra spaces among gaps and give remainders to earlier gaps.
5. Append the fixed-width line and continue after its final word.

## Walkthrough

Example 1 packs Pack and a on the first line because adding small would exceed maxWidth 10.
The first line has 5 letters and one gap, so that gap receives 5 spaces, producing Pack     a.
The final line contains small and bag, so it receives one normal space and trailing padding.
The result is Pack     a and small bag with each line length 10.

## Complexity

Let S be the total input word characters and L the number of output lines.
Each word is considered while packing once and each output character is emitted once, giving O(S plus L times maxWidth) time.
The output lines use O(L times maxWidth) space.
The current line builder and temporary pieces use O(maxWidth) additional space.

## Edge cases

The final line always uses single spaces between words.
A single-word nonfinal line is padded entirely on the right.
Extra spaces are assigned left to right when they do not divide evenly.
The statement guarantees every word fits within maxWidth.

## Common mistakes

- Distributing spaces evenly without giving earlier gaps the remainder violates the rule.
- Fully justifying the final line adds spaces between words incorrectly.
- Forgetting the required separator while testing a candidate line overfills it.
- Returning variable-length lines fails the fixed-width output contract.

## Language notes

Python builds fragments and uses ljust for left-justified lines.
Java appends to StringBuilder and uses repeat for exact padding.
Both references preserve the input word order.
