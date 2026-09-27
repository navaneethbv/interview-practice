## Intuition

Multiplication by a negative value reverses order: a very negative product can become the largest positive product.
Therefore one endpoint state is insufficient; keep both the smallest product `low` and largest product `high` ending at the previous position.
Starting a new singleton is always another candidate, especially after zero.

## Brute force

Try every subarray start and extend its end while maintaining a product.
This takes O(n²) time and constant auxiliary space, but repeats the endpoint work for many different starts.

## Approach

1. Use dynamic programming with `low`, `high`, and overall `best`, initially equal to `nums[0]`.
2. For the next `value`, consider `value`, `value * low`, and `value * high` using the old states.
3. Set the new `low` to their minimum and new `high` to their maximum.
4. Update `best` with the new `high`.
5. Return `best` after every endpoint is processed.

All segments ending here are either the singleton or extensions of earlier segments.
Multiplication by a fixed value maps the extrema of earlier products to the extrema of the extensions, so interior products need not be retained.

## Walkthrough

Example 1 is `nums = [-2, 3, -4]`.

| `value` | Candidate products | New `low` | New `high` | `best` |
| --- | --- | --- | --- | --- |
| -2 | Initialization | -2 | -2 | -2 |
| 3 | `3, -6, -6` | -6 | 3 | 3 |
| -4 | `-4, 24, -12` | -12 | 24 | 24 |

The negative product -6 becomes the optimal product 24 when multiplied by -4.
Discarding `low` would lose this answer.

## Complexity

- Time: O(n), with a constant number of multiplications and comparisons per entry.
- Space: O(1), including the constant-size candidate tuple in Python.

## Edge cases

Zero makes both endpoint extrema zero, while the next singleton can start a fresh segment.
An all-negative array may have a positive optimum from an even number of negatives.
A single negative number remains the answer because an empty segment is forbidden.

## Common mistakes

- Tracking only `high` misses sign reversals.
- Updating `low` before computing every candidate can mix current and previous states.
- Returning the final `high` misses a maximum ending earlier.

## Language notes

Python builds a three-item `candidates` tuple before updating both states.
Java saves `extendLow` and `extendHigh` before changing either state, preserving the same dependency.
The statement bounds every contiguous product to signed 32-bit range, so Java's intermediate products are safe.
Both references use index iteration without copying the input.
