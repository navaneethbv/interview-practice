## Intuition

Write the array as prefix A followed by suffix B.
Reversing the whole array produces reversed B followed by reversed A; reversing those two pieces individually then produces B followed by A in their original internal orders.

## Brute force

Copying the first third into temporary storage makes rotation simple but violates constant extra space.
Moving the first element to the end repeatedly shifts many values and can take quadratic time.

## Approach

Let n be the length.
Reverse indices 0 through n - 1, then reverse 0 through `2 * n // 3 - 1`, and finally reverse `2 * n // 3` through n - 1.
The helper swaps endpoints while moving inward.

## Walkthrough

Example 1 splits `badreview` into `bad` and `review`.
The whole reversal gives `weiverdab`.
Reversing its first six letters restores `review`, leaving `reviewdab`.
Reversing the final three letters gives `reviewbad`, matching the required character array.

## Complexity

The first reversal touches n elements and the two smaller reversals together touch n elements.
Total time is O(n), and the index variables plus one swap temporary use O(1) auxiliary space.
No second array is created.

## Edge cases

For length three, one initial character moves to the end.
An empty array causes each reversal loop to do nothing.
Repeated letters do not affect correctness because the operation depends on positions, not character uniqueness.

## Common mistakes

After reversing everything, the leading region has the old suffix's length, which is two thirds of n.
Do not split the reversed array after one third.
The helper accepts inclusive endpoints, so each region's end must be one less than its boundary.

## Language notes

Python uses integer division and simultaneous swaps.
Java uses character arrays and integer arithmetic with a temporary character.
Both methods return void, and the local spec reads the mutated first argument as the graded result.
