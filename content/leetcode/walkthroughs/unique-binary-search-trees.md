## Intuition

Choose each value in turn as the root of a binary search tree.
The left subtree must use the values before that root, and the right subtree must use the values after it.
Only the sizes matter, so a count for each smaller size can be reused.

## Brute force

A recursive generator could enumerate every tree shape and count the results.
The number of shapes grows exponentially, and storing every tree is much larger than storing their count.
Dynamic programming combines counts for subtrees without constructing any tree objects.

## Approach

1. Set treeCounts[0] to one because an empty subtree has one possible arrangement.
2. Compute counts in increasing subtree size.
3. Try every left subtree size from zero through size minus one.
4. Derive the right size as size minus one minus left size.
5. Add the product of the two previously computed counts.

## Walkthrough

Example 1 asks for n equal to 1.
The only size-one root has a left subtree of size zero and a right subtree of size zero.
Both counts are treeCounts[0], which equals 1.
Their product gives treeCounts[1] equal to 1, so the method returns 1.

## Complexity

For n values, size s tries s possible root positions.
Summing those loops gives O(n squared) time.
The count array uses O(n) auxiliary space.
The returned count is a scalar, and no tree nodes are allocated.

## Edge cases

n equal to zero returns treeCounts[0], which is one empty-tree arrangement.
A size-one input has one root choice.
Balanced and skewed shapes are all counted because every root size is considered.
The integer return type follows the problem's stated range.

## Common mistakes

- Setting the empty-subtree count to zero makes every product vanish.
- Adding left and right counts instead of multiplying counts root combinations incorrectly.
- Using size as a node value ignores that only subtree sizes are needed.
- Constructing actual trees wastes memory when only the count is requested.

## Language notes

Python stores counts in a list and uses integer multiplication for each root split.
Java uses an int array and the same size-based recurrence.
Both fill smaller sizes before reading them for a larger size.
