## Intuition

Two equal subsets must each sum to half of the total.
The problem becomes deciding whether some subset reaches target.
A one-dimensional boolean table records reachable sums, and descending updates ensure each number is used once.

## Brute force

Trying every subset takes O(2^n) time.
Subset-sum dynamic programming trades that exponential factor for the total target sum.

## Approach

1. Compute total and reject an odd total.
2. Set target to total / 2 and mark reachable[0] true.
3. For each value, scan sums downward from target to value.
4. Mark current reachable when the previous value-offset sum was reachable.
5. Return reachable[target].

## Walkthrough

Example 1 uses nums = [1, 5, 11, 5], with target 11.
After 1, sum 1 is reachable.
After 5, sums 6 and 5 become reachable.
After 11, target 11 becomes reachable directly.
The final 5 also allows 1 + 5 + 5, so the partition is true.

## Complexity

- Time: O(n × target), for each value's descending sum scan.
- Space: O(target), for the boolean table.

## Edge cases

An odd total immediately returns false.
One value cannot form two equal nonempty subsets under the given positive constraints.
Duplicate values are processed as separate items.
Descending updates prevent a value from being used multiple times in one pass.

## Common mistakes

- Scanning upward allows the current number to be reused.
- Checking total equality without finding a subset is insufficient.
- Forgetting the odd-total shortcut wastes work.
- Using a set without controlling repeated values can change the item model.

## Language notes

Python uses a bitset integer, where shifted bits represent reachable sums.
Java uses a boolean array and descending updates.
The mathematical recurrence and result are the same.
