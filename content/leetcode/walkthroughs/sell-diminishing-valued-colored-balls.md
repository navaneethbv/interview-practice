## Intuition

Selling one ball lowers the next value of that color by one.
Sort inventory levels and sell complete horizontal layers across all colors currently at the same height, then handle the final partial layer.

## Brute force

Selling one ball at a time with a max heap is correct but can require up to billions of operations.
Layer aggregation sells many equal-valued balls in one arithmetic-series calculation.

## Approach

1. Sort inventory in descending order and append a zero level.
2. At each index, `width` colors share the current high level.
3. If all levels down to `low` can be sold, add the full arithmetic sum and continue.
4. Otherwise sell complete levels and `extra` balls from the remaining level, then stop.
5. Apply modulo `1000000007` to the profit.

## Walkthrough

For Example 1, `inventory = [2, 5]` and `orders = 4`.
The color with five balls sells at prices 5, 4, and 3, then the color with two balls contributes a ball priced 2.
The revenue is `5 + 4 + 3 + 2 = 14`.
The algorithm reaches the same result by processing complete shared levels and then any final partial level.

## Complexity

Sorting takes `O(m log m)` for `m` colors, and the layer scan is `O(m)`.
Python's descending sorted copy uses O(m) working storage, while Java's primitive array sort uses an implementation-dependent O(log m) sort stack and O(1) scan state.

## Edge cases

An inventory level equal to the next level contributes no positive-width layer and is naturally handled by `available = 0`.
The modulo is applied after large sums so the return value stays within the required range.

## Common mistakes

- Selling from one color until empty can miss the equal next value of another color.
- Forgetting the extra partial balls loses orders when the final layer is incomplete.
- Using ordinary integer multiplication in Java can overflow before modulo reduction.

## Language notes

Python integers are unbounded, while Java uses `long` for arithmetic-series products and the remaining order count.
Java sorts ascending and scans backward, which is equivalent to Python's descending copy.
