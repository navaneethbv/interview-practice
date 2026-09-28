## Intuition

Fix the top and bottom rows, turning every rectangle between them into a one-dimensional subarray of column sums.
For each prefix sum, the smallest earlier prefix at least `current - k` gives the largest subarray sum not exceeding `k`.

## Brute force

Enumerating all rectangle boundaries costs `O(rows^2 columns^2)` time.
Compressing rows and using ordered prefix sums removes one boundary dimension from the inner search.

## Approach

1. Fix `top` and accumulate `column_sums` as `bottom` moves downward.
2. Scan those sums with sorted prefix values.
3. Find the first prior prefix at least `prefix - k` using binary search or a tree set.
4. Update the best sum and insert the current prefix.

## Walkthrough

For Example 1, matrix `[[1, 0, 1], [0, -2, 3]]` and `k = 2`.
Using both rows gives column sums `[1, -2, 4]`.
The final two columns sum to `-2 + 4 = 2`, which meets the limit exactly.
No qualifying rectangle has a larger sum, so the result is `2`.

## Complexity

The Java `TreeSet` version takes `O(rows^2 * columns log columns)` time.
Python inserts into a sorted list, which shifts O(columns) entries in the worst case, so its bound is `O(rows^2 * columns^2)`.
Both use O(columns) temporary strip and prefix storage.

## Edge cases

Negative values mean the best result may be negative, so the initial answer is negative infinity.
The statement guarantees at least one qualifying nonempty rectangle.

## Common mistakes

- Using a prefix less than `current - k` can produce a sum above the limit.
- Initializing the best sum to zero rejects all-negative valid answers.
- Forgetting the empty prefix misses rectangles beginning at the first column.

## Language notes

Python maintains sorted prefixes with `bisect` and insertion, while Java uses `TreeSet.ceiling`.
Both accumulate row values without modifying the input matrix.
