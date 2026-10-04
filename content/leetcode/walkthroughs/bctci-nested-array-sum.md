## Intuition

The sum of a nested array is the sum of its immediate integer entries plus the sums of its immediate nested arrays.
This definition naturally becomes a recursive function.
Nesting changes how values are reached, but does not change their contribution to the total.

## Brute force

Flatten all nested integers into a separate array and sum that array afterward.
The traversal is still linear, but the flattened copy uses storage proportional to the number of integer values.
The references accumulate directly instead.

## Approach

Initialize `total` to zero for the current list.
For every `item`, call `isInteger` to determine which part of the interface is valid.
If it is an integer, add `getInteger` directly.
Otherwise recurse on `getList` and add the returned subtotal.
When the list ends, return its accumulated total to the caller.
An empty nested list naturally returns zero because its loop has no iterations.
Every integer belongs to exactly one immediate list, so this decomposition includes each value once without omission or duplication.

## Walkthrough

Example 1 is `[1, [2, 3], [4, [5]], 6]`.
The first nested list returns 5 from 2 plus 3.
The innermost `[5]` returns 5, allowing its parent `[4, [5]]` to return 9.
The top level combines 1, 5, 9, and 6 for a final sum of 21.
No depth multiplier is applied to the nested 5.

## Complexity

Both references take O(t) time for t total nested entries, including container entries as well as integers.
The recursion stack uses O(d) space for maximum nesting depth d.
There is no flattened output array or other storage proportional to the number of integers.

## Edge cases

Empty nested lists contribute zero.
Negative integers can cancel positive values, and a deeply nested singleton contributes exactly its own value.

## Common mistakes

Call the correct accessor after checking the entry type.
Do not treat this as a depth-weighted sum problem.

## Language notes

The harness provides `NestedInteger` objects in both languages.
Python integers grow automatically; Java returns `long` because summing many large signed integers can exceed `int` capacity.
