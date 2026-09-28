## Intuition

The score record is a stack-like list because every operation refers only to recent valid scores.
C removes the last score, D doubles it, and plus combines the last two.

## Brute force

Recomputing the score history for every operation would repeat work.
One list models the current record directly.

## Approach

1. Append integer operations.
2. For D append twice the last score.
3. For plus append the last two sum.
4. Pop for C and sum the final record.

## Walkthrough

For Example 1, scores begin `[5,2]`.
C removes 2, D appends 10, and plus appends 15.
The remaining scores are `[5,10,15]`, totaling 30.

## Complexity

Each operation updates the list in O(1), so processing costs O(n) time.
The score list uses O(n) space in the worst case.

## Edge cases

Negative scores are valid.
C can remove the latest derived score.
The operation contract guarantees enough prior scores for plus and D.

## Common mistakes

Plus uses the last two current scores, not the original operations.
Remove only the most recent score for C.
Keep derived scores in the record for later operations.

## Language notes

Python stores integers directly.
Java uses `ArrayList<Integer>` and parses numeric strings.
The list contains only scores still active after each operation, which makes later plus and double operations use the correct record.
The final sum ignores scores removed by C.
Every derived score is appended and can be referenced by later operations.
The operation sequence is processed in the given order.
