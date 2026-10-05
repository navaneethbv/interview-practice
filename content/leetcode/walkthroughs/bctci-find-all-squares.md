## Intuition

The mathematical relation directly identifies the only candidate partner for each value: its square.
A map from values to original indices lets us test that partner immediately.
Distinct input values ensure each square has at most one index.

## Brute force

Try every ordered pair of positions and test whether the second value equals the square of the first.
This uses O(n²) comparisons and O(1) auxiliary space apart from output.

## Approach

Build `position` by recording each value and its input index.
Scan `arr` again with index i and value `value`.
Compute `value * value` and look it up in `position`.
When found, append `[i, position[value * value]]` to the result.
The lookup must use the squared value rather than a square root, avoiding floating-point accuracy concerns.
Each valid ordered pair is emitted when its first index is scanned, so it appears exactly once.

## Walkthrough

Example 1 is `[4, 10, 3, 100, 5, 2, 10000]`.
The value 4 has no partner 16, while 10 finds 100 at index 3 and contributes `[1, 3]`.
The value 100 finds 10000 at index 6, contributing `[3, 6]`.
The value 2 finds 4 at index 0, contributing `[5, 0]`.
The other squares are absent.
These are the same three pairs as the example, although their listing order differs.

## Complexity

Building and probing the hash map takes O(n) expected time.
The map requires O(n) space, and there are at most n output pairs.

## Edge cases

An empty array returns no pairs.
For value 1, its square is itself, and `[i, i]` is explicitly allowed by the statement.

## Common mistakes

Return indices rather than values.
Do not impose a distinct-index requirement, which would incorrectly exclude 1.

## Language notes

Java promotes the value to long before multiplication and uses `Map<Long, Integer>`.
This matters because squaring a valid value as large as one billion exceeds int range, even when the square is absent.
