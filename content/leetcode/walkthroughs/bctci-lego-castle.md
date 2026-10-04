## Intuition

To build the next castle, we need both the previous block count and its width.
The new top row spans two old widths plus the one-unit gap, so its size cannot be inferred from the story count alone without a recurrence.

## Brute force

Constructing both recursive subcastles separately repeats identical work and grows exponentially.
Their counts are equal, so one computed summary can be doubled.

## Approach

Initialize `blocks = 1` and `width = 1` for the one-story castle.
For each additional story, first update width to `2 * width + 1`.
Then update blocks to `2 * blocks + width`, using that new width for the added row.
After n - 1 iterations, blocks is the requested count.
Inductively, the width recurrence spans both subcastles and their gap, while the block recurrence includes every old block twice plus each new top-row block once.

## Walkthrough

```text
Input: n = 2
Output: 5
```

Example 1 asks for two stories.
The initial one-story castle has one block and width one.
The next width is 2 times 1 plus 1 = 3.
Two one-block subcastles contribute two blocks, and the new top row contributes three.
The updated total is 2 + 3 = 5.

## Complexity

The loop performs n - 1 constant-sized arithmetic updates, giving O(n) time and O(1) extra space under the bounded-integer model.
No actual grid or recursive castle representation is allocated.

## Edge cases

For n equal to one, the loop is skipped and the result is one.
Every new story increases both width and block count.
The specified upper bound keeps the result exactly representable by the runner's numeric format.

## Common mistakes

Updating blocks before width would use a top row that is too short.
The one-unit gap contributes a block to the top row, not to the lower subcastle interiors.

## Language notes

Python uses its integer type.
Java stores both summaries as long because the counts grow exponentially with the number of stories.
