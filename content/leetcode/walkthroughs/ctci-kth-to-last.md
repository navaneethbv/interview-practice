## Intuition

A pointer positioned k nodes ahead of another pointer can reveal the answer without knowing the list length.
When the leading pointer reaches the end, exactly k nodes remain starting at the trailing pointer.
The requested result is the trailing node's value.

## Brute force

Count the list length n, then walk n minus k links from the head.
This is also linear time and constant space, but it traverses part of the list twice and needs a separate length calculation.

## Approach

Set `lead` to `head` and advance it exactly k times.
Set `trail` to `head`.
While `lead` is not null, move both pointers one link forward.
Their separation remains k nodes throughout the second loop.
Return `trail.val` when `lead` becomes null.
The input contract guarantees a valid k, so the initial advances never attempt to dereference a missing node.

## Walkthrough

Example 1 uses `[1, 2, 3, 4, 5]` and `k = 2`.
After two initial advances, `lead` points to 3 while `trail` points to 1.
Moving together gives pointer pairs `(4, 2)`, `(5, 3)`, and finally `(null, 4)`.
Two nodes remain from 4 onward, namely 4 and 5.
Return 4, matching the second-to-last position.

## Complexity

For n nodes, the total number of pointer advances is O(n).
Only two node references are retained, so auxiliary space is O(1).
The input list is not modified.

## Edge cases

When k equals one, the answer is the tail.
When k equals the length, the initial loop reaches null and `trail` remains at the head.
A one-node list therefore works without special treatment.

## Common mistakes

Advancing the leading pointer k minus one times requires a different stopping condition.
Mixing that setup with the reference's null-based loop returns the wrong position.

## Language notes

Python checks node truthiness; Java explicitly checks for null.
Both return the integer value, not a node or a suffix list.
