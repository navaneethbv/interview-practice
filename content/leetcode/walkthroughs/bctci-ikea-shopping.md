## Intuition

At most fifteen items makes exhaustive subset search practical.
For each item, an optimal subset either includes it or excludes it.
Tracking remaining budget and accumulated rating lets the search evaluate those choices without rebuilding each subset from scratch.

## Brute force

Enumerate all bit masks and independently sum each selected subset's prices and ratings.
That costs O(n 2ⁿ) time and is already feasible at the given small n.

## Approach

The reference explores choices recursively with `index`, `remaining`, `rating`, and `picked`.
First recurse without the current item.
If its price fits, append its index, recurse with reduced budget and increased rating, then pop it to restore the path.
At the end of the item list, replace the stored best choice only when the rating strictly improves.
Copy `picked` when saving it because the working list will continue changing.
Every feasible subset appears in exactly one branch sequence, ensuring that the best leaf is globally optimal.

## Walkthrough

Example 1 has budget 20.
Choosing item 0 costs 10 and contributes rating 7; choosing item 3 adds cost 8 and rating 6.
Their combined cost is 18 and rating is 13.
Another feasible combination, items 0, 1, and 4, costs 18 but rates 12.5.
The complete search finds no feasible subset above 13, so it returns `[0, 3]`.

## Complexity

There are O(2ⁿ) recursion nodes; copying a best subset can cost O(n), giving O(n 2ⁿ) worst-case time.
The recursion, current choice, and saved best choice use O(n) space.

## Edge cases

No items yields an empty selection with rating zero.
Multiple optimal subsets are valid; the validator checks budget and optimal rating rather than a fixed index sequence.

## Common mistakes

Rating-to-price greedy selection is not guaranteed optimal for indivisible items.
Always undo the appended index after exploring the include branch.

## Language notes

Python keeps best state in a local list; Java stores it in fields on its Solution instance.
Both use floating-point ratings and return original item indices.
