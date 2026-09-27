## Intuition

An integer's contribution is its value multiplied by its nesting depth.
The outer list starts at depth 1.
When an element is itself a list, every item inside it is one level deeper.
Recursive descent mirrors that definition directly and adds each integer at the moment it is found.

## Brute force

A flattened representation could first collect every integer with its depth and then perform a second pass for the weighted sum.
That still takes O(I + L) time for I integers and L nested lists but requires O(I) additional records.
The recursive accumulator performs the multiplication during the first traversal and avoids that intermediate collection.

## Approach

1. The public method calls Python's _sum_at_depth helper with the outer list and depth 1.
2. For each item, add value times depth when it is an integer.
3. Otherwise recurse on its nested list with depth plus one.
4. Return the accumulated total from each list to its caller.

## Walkthrough

For Example 1, the outer integer 2 contributes 2 at depth 1.
Each of the four ones is inside a nested list, so each contributes 1 times 2.
The total is 2 plus 8, which equals 10.
For Example 2, 1 contributes 1, 4 contributes 8 at depth 2, and 6 contributes 18 at depth 3.
The final total is 27.

## Complexity

Every list and integer is visited once, so the time complexity is O(I + L) for I integers and L nested lists.
The recursion stack uses O(D) space for maximum nesting depth D.
The stated depth limit of 50 keeps recursion within the supported input range.

## Edge cases

An empty outer list contributes zero.
Empty nested lists contribute nothing.
Zero-valued integers are multiplied normally and add zero.
Negative integers contribute negative weighted values.

## Common mistakes

Do not start the outer depth at zero.
Do not add a nested integer at its parent's depth.
Do not treat an empty list as an integer.
Do not flatten without retaining each item's depth.

## Language notes

Python uses the NestedInteger interface methods supplied by the harness and its _sum_at_depth recursive helper.
Java uses the corresponding interface methods and its private sumAtDepth helper.
Both references keep the required depthSum signature and integer result.
