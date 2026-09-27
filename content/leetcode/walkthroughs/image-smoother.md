## Intuition
Each output pixel is the floor average of its valid neighboring pixels in a three by three square.
Compute the neighborhood directly while reading only from the unchanged input image.

## Brute force
A naive approach can build a list of neighbors for every output cell before summing it.
It still takes O(RC) time but allocates up to nine temporary values per cell.
The reference accumulates directly and avoids those per-cell lists.

## Approach
1. Allocate an output matrix with the same dimensions.
2. For each cell, clamp row and column ranges to the image boundary.
3. Sum all values in that local rectangle and count them.
4. Store integer floor division of the sum by the count.

## Walkthrough
Example 1 is `[[1, 2], [3, 4]]`.
For the top-left cell, all four pixels are neighbors and sum to 10, so floor division by 4 gives 2.
The top-right cell uses the same four values and also gives 2.
The bottom-left and bottom-right cells likewise average all four pixels to 2.
The output is `[[2, 2], [2, 2]]`.

## Complexity
For R rows and C columns, each cell examines at most nine neighbors, so time is O(RC).
The output matrix uses O(RC) space.
The Python and Java references use O(1) temporary accumulation per cell.

## Edge cases
A one-cell image returns its original value.
Boundary cells have fewer than nine neighbors.
Floor division is required for nonintegral averages.

## Common mistakes
Reading from the output while writing changes later averages.
Using a fixed nine-cell divisor undercounts borders.
Rounding instead of flooring changes values such as 255 divided by 2.

## Language notes
Python builds a separate list of rows for the result.
Java allocates an `int[][]` output and uses helper bounds without converting rows to arrays.
