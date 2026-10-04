## Intuition

A valley's largest remaining value must be at one of its two ends.
Removing that end leaves another valley-shaped interval.
We can therefore repeatedly choose the larger endpoint and fill the output backward from largest to smallest.

## Brute force

Use a general comparison sort on a copy of the input.
That takes O(n log n) time, missing the linear-time opportunity supplied by the valley shape.

## Approach

Allocate `result` and initialize `left = 0`, `right = n - 1`.
For output positions from n - 1 down to zero, compare `arr[left]` with `arr[right]`.
Write the larger value into the current result position and advance only its corresponding endpoint inward.
On equality, the reference selects the left endpoint; either choice preserves sorted values.
The filled output suffix always contains the largest removed values in ascending order, while the unprocessed input interval still contains exactly the values needed for the remaining prefix.

## Walkthrough

Example 1 starts with `[8, 4, 2, 6]`.
Compare endpoints 8 and 6, place 8 at result index 3, and move left to 1.
Now compare 4 and 6, place 6 at index 2, and move right to 2.
Compare 4 and 2, place 4 at index 1.
The final remaining value 2 fills index 0.
The output is `[2, 4, 6, 8]`.

## Complexity

Exactly n values are selected, so time is O(n).
The required new result takes O(n) space, with O(1) auxiliary working space beyond that output.

## Edge cases

An empty array creates an empty result and never indexes the input.
Equal values and a flat valley bottom are handled by the endpoint comparison.

## Common mistakes

Fill backward when choosing the largest endpoint.
The same method would be incorrect for an arbitrary unsorted array whose maximum lies in the interior.

## Language notes

Both references preserve the input and return a new array.
Python uses a descending range; Java uses a decreasing output index with separate left and right pointers.
