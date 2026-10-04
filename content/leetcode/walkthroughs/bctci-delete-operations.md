## Intuition

Deletion does not change original indices, and minimum deletion depends on value with an index tie-break.
Keep logical deletion flags plus one fixed sorted index order instead of physically removing array elements.

## Brute force

Finding the minimum by scanning remaining elements for every -1 operation costs O(nm).
Physically deleting elements also complicates the original-index contract.

## Approach

Sort indices by `(nums[index], index)` and initialize all `deleted` flags false.
A nonnegative operation simply marks its original position deleted.
For -1, advance `pointer` past flagged indices in sorted order, then flag the first surviving index.
After all operations, scan nums in its original order and return values whose flags are false.
The pointer never moves backward because deleted values never return.
Its first surviving position is therefore always the smallest available value with the required tie-break.

## Walkthrough

```text
Input: nums = [50, 30, 70, 20, 80], operations = [2, -1, 4, -1]
Output: [50]
```

Example 1 has sorted index order `[3, 1, 0, 2, 4]`, corresponding to values 20, 30, 50, 70, 80.
Delete operation 2 removes 70.
The first -1 removes 20, operation 4 removes 80, and the final -1 skips the deleted 20 and removes 30.
Only the original first value 50 remains.

## Complexity

Sorting takes O(n log n), and all pointer advances together take O(n).
For m operations, total time is O(n log n + m).
Flags, index order, and output use O(n) space.

## Edge cases

Repeated explicit deletions are harmless.
Duplicate minimum values are removed by smaller original index first.
An empty operation list preserves every value and its order.

## Common mistakes

Do not interpret an explicit index in the shortened remaining list.
Do not return surviving values in sorted order.

## Language notes

Python sorts with a tuple key.
Java's comparator explicitly breaks equal-value ties by index and uses comparisons rather than potentially overflowing subtraction.
