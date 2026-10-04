## Intuition

The sum of a nested list is the sum of its immediate integers plus the sums of its immediate nested lists.
This recursive definition means each subtree can be reduced independently, without flattening the structure into a separate collection first.

## Brute force

Flatten all integers into a new array and sum that array afterward.
This still visits every entry, but allocates storage proportional to the number of integers when only a running total is needed.

## Approach

Initialize `total` to zero for the current list.
For each `item`, ask `isInteger()` which representation it holds.
Add `getInteger()` directly for an integer.
Otherwise call `nestedSum` on `getList()` and add the returned subtotal.
An empty child list contributes zero because its loop performs no additions.
By induction on nesting depth, each returned subtotal includes exactly the integer leaves in that list, once each.

## Walkthrough

Example 1 is `[1, [2, 3], [4, [5]], 6]`.
The first item contributes one.
The list `[2, 3]` recursively returns five.
Inside `[4, [5]]`, the innermost list returns five and its parent returns nine.
The final integer contributes six.
The outer total is `1 + 5 + 9 + 6 = 21`.

## Complexity

Time is O(m), where m counts all visited nested-list entries, including container entries as well as integers.
Recursion uses O(d) auxiliary space for maximum nesting depth d.
No flattened list is created.

## Edge cases

An empty outer list returns zero.
Empty lists may appear at any depth.
Negative integers cancel positive values normally, and deeply nested singleton lists preserve the same integer sum.

## Common mistakes

Do not multiply values by their depth; this problem asks for an ordinary sum.
Do not call the integer accessor on an item that holds a list.

## Language notes

The runner wraps JSON nested arrays in `NestedInteger` helpers for both languages.
Python integers hold the total directly, while Java returns `long` to accommodate up to 100,000 large-magnitude integers.
