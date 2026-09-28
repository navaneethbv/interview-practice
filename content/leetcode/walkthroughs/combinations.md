## Intuition

A combination is an increasing path of values from 1 through n.
The next value has a bounded maximum that leaves enough numbers for the remaining slots.

## Brute force

Generating all subsets and filtering by size costs 2^n.
Backtracking constructs only increasing paths of possible length.

## Approach

1. Start with an empty path at value 1.
2. Compute the largest allowable next value so enough values remain.
3. Append each candidate, recurse, and pop it afterward.
4. Copy paths when they reach k values.

## Walkthrough

For Example 1, n=4 and k=2.
Choosing 1 produces `[1,2]`, `[1,3]`, and `[1,4]`.
After backtracking, choosing 2 produces `[2,3]` and `[2,4]`, and choosing 3 produces `[3,4]`.
Those six paths are the expected combinations.

## Complexity

The search visits O(C(n,k)k) output and path states, with O(k) recursion space.
The returned combinations themselves use O(C(n,k)k) space.
Python and Java copy each completed path.

## Edge cases

k=1 returns each number separately.
When k=n, only the full increasing path exists.
The bound prevents branches that cannot fill the remaining slots.

## Common mistakes

Do not reuse a selected value.
Copy before backtracking.
Keep combinations increasing so order is not duplicated.

## Language notes

Python uses `_visit` with a list slice copy.
Java uses `ArrayList` copying at leaves.
The result comparison ignores ordering, but increasing paths still avoid duplicate selections.
The recursion depth never exceeds k.
The maximum candidate leaves exactly the required number of values available.
This is the pruning invariant.
It also bounds the next loop before recursion starts.
