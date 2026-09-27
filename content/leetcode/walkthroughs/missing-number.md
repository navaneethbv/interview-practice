## Intuition

XORing a number with itself cancels it, while XORing with zero leaves it unchanged.
Combine every expected number from 0 through n with every actual input value.
All present values cancel in pairs, leaving only the missing number.

## Brute force

For each expected number, scan `nums` to check whether it appears.
That takes O(n²) time and O(1) space.
A set speeds up membership checks but uses O(n) additional space, which XOR avoids.

## Approach

1. Use the XOR cancellation pattern, initializing `answer` to `len(nums)`.
2. For each `index` and corresponding `value`, update `answer ^= index ^ value`.
3. Return `answer` after the scan.

The indices supply every expected value from zero through n minus one, and initialization supplies n.
The input contributes every value in that range except the absent one.
Associativity and commutativity allow equal values to cancel regardless of input order.

## Walkthrough

Example 1 has `nums = [4, 0, 2, 1]` and n equal to 4.
Initialize `answer = 4`.

| `index` | `value` | XOR update | New `answer` |
| --- | --- | --- | --- |
| 0 | 4 | `4 ^ 0 ^ 4` | 0 |
| 1 | 0 | `0 ^ 1 ^ 0` | 1 |
| 2 | 2 | `1 ^ 2 ^ 2` | 1 |
| 3 | 1 | `1 ^ 3 ^ 1` | 3 |

After all cancellations, 3 is the only uncancelled expected value.

## Complexity

- Time: O(n), performing one XOR update per element.
- Space: O(1), with no lookup structure or copied array.

## Edge cases

If zero is missing, cancellation leaves zero as the final answer.
If n is missing, the initialized n never finds a matching input value to cancel it.
A one-element input works with the same loop.
Distinctness is essential; duplicates would break the paired-cancellation premise.

## Common mistakes

- Initializing `answer` to zero without separately including n omits one expected number.
- Sorting first performs unnecessary work and changes the input.
- Using this algorithm without the distinctness guarantee can return a misleading result.

## Language notes

Both implementations use integer XOR, with Python's `enumerate` providing each index and value together.
Java indexes directly into `nums`.
XOR introduces no arithmetic overflow, and every allowed value easily fits in Java `int`.
