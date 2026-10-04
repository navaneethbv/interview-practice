## Intuition

An auxiliary stack can act like the sorted prefix of insertion sort.
Keep its smallest item on top.
Before inserting a larger item, temporarily move smaller top items back to the source so the new item can sit beneath them.

## Brute force

Sorting a copied array would take O(n log n) time, but would bypass the intended stack operations.
Repeatedly scanning for the next largest item is quadratic and also requires accessing positions that a stack does not expose.

## Approach

Copy the input into `source` and start with an empty `ordered` stack.
Pop one `value` from `source`.
While the top of `ordered` is smaller than `value`, move that top back to `source`.
Then push `value` onto `ordered`.
The already ordered stack retains nonincreasing order from bottom to top, and displaced items are reconsidered in later iterations.
Return the ordered stack in the array convention where the final element is its top.

## Walkthrough

Example 1 starts with `[3, 1, 4, 2]`, whose top is 2.
Move 2 to `ordered`.
When 4 is popped, move 2 back, then place 4 beneath it as processing continues.
After reinserting 2 and then 1, the ordered stack is `[4, 2, 1]`.
Inserting 3 temporarily displaces 1 and 2.
They are restored above 3, producing `[4, 3, 2, 1]` with minimum 1 on top.

## Complexity

There can be O(n squared) transfers in the worst case.
The source copy and auxiliary stack use O(n) space, including the returned representation.

## Edge cases

An empty input returns an empty stack.
Equal values remain valid because only strictly smaller top values are displaced.
Negative numbers follow the same comparisons.

## Common mistakes

Reversing the comparison creates the opposite ordering.
Returning a top-first serialization would also contradict the stated array convention.

## Language notes

Python uses list append and pop at the end.
Java uses deques, then fills the result array from the final index downward to preserve the same bottom-to-top output order.
