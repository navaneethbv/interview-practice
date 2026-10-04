## Intuition

A blue rectangle spanning several columns is limited by the shortest column in its span.
A monotone stack identifies the widest useful span for each height when a shorter column finally ends it.

## Brute force

Trying every column interval while tracking its minimum height takes O(n squared) time.
The stack shares boundary information across intervals.

## Approach

Scan column indices with nondecreasing heights on the stack.
When the current height is smaller than the top height, pop that top index as `previous`.
The current index is its right boundary; the new stack top is the excluded left boundary, or -1 if none exists.
Compute area as `tiles[previous] * (index - left - 1)` and update best.
Append a virtual zero-height column after the real array to flush remaining positive heights.
Equal heights may stay stacked, with an earlier equal entry eventually receiving the full width.

## Walkthrough

```text
Input: [[2, 2, 0]]
Output: 4
```

Example 1 pushes both height-2 columns.
At index 2, the zero height pops index 1, producing width 1 and area 2.
It then pops index 0, leaving no left boundary and producing width 2 and area 4.
The zero column contributes no larger rectangle.
The maximum blue area is 4.

## Complexity

Each index is pushed once and popped at most once, giving O(n) time.
The stack uses O(n) extra space in the worst case.

## Edge cases

All-zero heights return zero.
A single column contributes its own height.
Increasing heights need the final virtual zero to complete their spans.

## Common mistakes

The width excludes both boundary positions, hence the subtraction of one.
Do not omit equal-height handling or prematurely discard their possible wider spans.

## Language notes

Python integer multiplication safely handles the area.
Java casts height to long before multiplying by width, as areas may exceed int capacity under the stated million-column limit.
