## Intuition

A rectangle spanning consecutive columns has height limited by its shortest column.
A monotonic stack identifies the widest interval over which each height can serve as that limiting height, without checking every interval explicitly.

## Brute force

For every left endpoint, extend the right endpoint while maintaining the minimum column height.
This considers O(n squared) intervals and calculates each area in constant additional work.

## Approach

Store column indices in a stack with nondecreasing heights.
When a shorter `height` arrives, pop each taller `previous` column.
The current index is its exclusive right boundary, and the new stack top `left` is its left blocking boundary, or -1 if absent.
Evaluate `tiles[previous] * (index - left - 1)` and update `best`.
A final synthetic zero height flushes positive heights remaining in the stack.
Equal heights remain until a later smaller value exposes their different possible widths.

## Walkthrough

Example 1 is `[2, 2, 0]`.
Indices zero and one are both pushed because their heights are equal.
At index two, height zero pops index one, giving height two and width one for area two.
Popping index zero next leaves no left boundary, giving width two and area four.
No later rectangle improves `best`, so the answer is 4.

## Complexity

Time is O(n), as each real index is pushed and popped at most once.
The stack needs O(n) auxiliary space in a nondecreasing histogram.

## Edge cases

All-zero columns yield zero area.
A single positive column uses width one.
Long plateaus must eventually be considered across their full width.

## Common mistakes

The width excludes both blocking boundaries, hence the subtraction of one.
Do not multiply before widening Java arithmetic or forget to flush the stack after the final real column.

## Language notes

Python's integers support large areas.
Java casts the height to `long` before multiplication and returns a long-valued best area, as required by the spec.
