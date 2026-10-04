## Intuition

Each item has two choices: skip it or buy it if the remaining budget permits.
With at most fifteen items, exhaustive subset search is small enough and avoids unreliable greedy choices based on price or rating ratios.

## Brute force

The reference uses exhaustive search deliberately.
A ratio-based greedy strategy can miss an optimal combination because items cannot be purchased fractionally.

## Approach

`choose` tracks the next index, remaining budget, accumulated rating, and selected indices.
Always recurse on skipping the item.
If affordable, append its index, recurse on taking it, then pop to restore the selection.
At the end, copy the selected list when its rating strictly improves best.
Every feasible subset corresponds to one sequence of skip/take decisions, and the budget guard excludes only unaffordable subsets.
Thus comparing complete choices finds an optimal selection.

## Walkthrough

```text
Input: budget = 20, prices = [10, 5, 15, 8, 3], ratings = [7.0, 3.5, 9.0, 6.0, 2.0]
Output: [0, 3]
```

Example 1 can choose items 0 and 3 for total price 10 + 8 = 18 and rating 7 + 6 = 13.
Adding item 4 would exceed budget 20.
Other feasible combinations include items 2 and 1 with rating 12.5, and items 0, 1, and 4 with rating 12.5.
The search compares all feasible subsets and retains the higher-rated `[0, 3]` choice.

## Complexity

The search has O(2 to the power n) branches.
Copying improved selections gives a conservative O(n times 2 to the power n) time bound.
Recursion, current selection, and saved best use O(n) space.

## Edge cases

No items or no affordable items can return an empty selection.
Zero ratings are valid.
Equal-rating optimal selections need no special tie rule.

## Common mistakes

Copy best rather than retaining the mutable picked list.
Do not reuse an item by recursing without advancing index.

## Language notes

Python stores the best rating and selection in a closure-accessible pair.
Java stores them in fields and uses double arithmetic for ratings.
