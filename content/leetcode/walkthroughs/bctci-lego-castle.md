## Intuition

Building the next castle requires two copies of the previous castle plus one new spanning row.
The row length depends on the previous width, so track width alongside the number of blocks.
These two quantities fully describe the information needed for the next story.

## Brute force

Recursively build both identical smaller castles and add their block counts.
Without reusing the smaller result, this repeats the same work and grows exponentially with n.

## Approach

Initialize `blocks = 1` and `width = 1` for the one-story castle.
Repeat the construction n - 1 times.
First update `width = 2 * width + 1`, accounting for two old widths and the one-unit gap.
Then update `blocks = 2 * blocks + width`, where the new width is the number of blocks in the new top row.
After each iteration, the two variables describe a complete castle one story taller.
The recurrence follows the construction exactly, so induction on the story count proves the returned block total.

## Walkthrough

Example 1 asks for two stories.
Start with the one-story state `blocks = 1`, `width = 1`.
The next width is `2 * 1 + 1 = 3`.
Two one-block castles contribute 2 blocks, and the spanning row contributes 3 more.
The updated block total is `2 * 1 + 3 = 5`.
There is only one iteration, so the function returns 5.

## Complexity

There are n - 1 iterations with constant arithmetic work under the fixed numeric bounds.
Time is O(n), and auxiliary space is O(1).
No physical grid of the castle is constructed.

## Edge cases

For n = 1, no updates occur and the answer is one.
The upper bound of 47 keeps the returned value within the runner's exact JSON integer range.

## Common mistakes

Use the newly computed width when adding the top row.
The gap contributes one block to that row even though the lower castles remain separated.

## Language notes

Python integers handle the recurrence directly.
Java uses `long` for both variables, since valid results can far exceed signed 32-bit range.
