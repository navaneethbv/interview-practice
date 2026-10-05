## Intuition

Maintain regions of confirmed red, white, and blue values around an unknown middle region.
Each inspection moves one element into its final color region without requiring a full comparison sort.

## Brute force

Sorting with a custom comparator takes O(n log n) time.
Counting each color and rewriting the array uses two passes.
The requested one pass constant space solution instead partitions the array while scanning.

## Approach

Use `red`, `current`, and `blue` as region boundaries.
For red, swap with `arr[red]` and advance both left boundaries.
For blue, swap with `arr[blue]` and shrink the right boundary.
For white, advance only `current`.

## Walkthrough

Example 1 begins with red and white already handled.
The blue at index 2 swaps with the final white.
The next blue swaps with the red near the end, which is then moved into the red region.
Finishing the scan yields `R R W W W B B`.

## Complexity

Each iteration reduces the unknown region by one element, giving O(n) time.
Only three indices and a temporary swap value are needed, so auxiliary space is O(1).
The output is the mutated input array.

## Edge cases

An empty array begins with `blue = -1` and performs no iterations.
Single color arrays remain valid.
A swapped element may be the same position as its destination, and such self swaps are harmless.

## Common mistakes

Do not advance `current` after moving a blue element right, because the incoming value is still unclassified.
The ordering is red, white, blue, not character alphabetic order.
Keep scanning while `current <= blue`.

## Language notes

Python uses simultaneous assignment for swaps.
Java's helper exchanges primitive characters and uses postincrement arguments to update boundaries.
Both methods return no value; the spec grades argument zero after mutation rather than a separate returned collection.
