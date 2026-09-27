## Intuition

Everything except one position splits into the entries strictly before it and strictly after it.
Multiplying a prefix product by a suffix product therefore gives the answer without division.
Store the prefix products directly in `result`, then incorporate suffix products in a reverse scan.

## Brute force

For each position, multiply every other entry from scratch.
That takes O(n²) time and repeats nearly identical work for neighboring positions.
Dividing a total product is disallowed and would also need special treatment for zero values.

## Approach

1. Use the prefix/suffix product pattern with `prefix = 1`.
2. Scan left to right, storing `prefix` in the current result position before multiplying it by the current input value.
3. Set `suffix = 1` and scan right to left.
4. Multiply each result position by `suffix`, then include the current input value in `suffix`.
5. Return `result`.

The order of each update excludes the current element from both factors.
The value 1 represents the product of an empty side at either end of the array.

## Walkthrough

Example 1 uses `nums = [2, 3, 4]`.
The first pass stores the prefixes `[1, 2, 6]`.

| Reverse `index` | Stored prefix | Incoming `suffix` | Final `result[index]` | New `suffix` |
| --- | --- | --- | --- | --- |
| 2 | 6 | 1 | 6 | 4 |
| 1 | 2 | 4 | 8 | 12 |
| 0 | 1 | 12 | 12 | 24 |

The answer is `[12, 8, 6]`, omitting 2, 3, and 4 respectively.

## Complexity

- Time: O(n), from two linear passes.
- Space: O(1) auxiliary space beyond the O(n) returned array, because only running products and indices are retained.

## Edge cases

With exactly one zero, only that zero's position can have a nonzero answer.
With two or more zeros, every answer is zero.
Negative values naturally affect signs through multiplication.
The two-element case returns the two values in reversed positions.

## Common mistakes

- Updating `prefix` before storing it accidentally includes the current value.
- Updating `suffix` before applying it causes the same error from the other direction.
- Initializing either running product to zero makes all results zero.

## Language notes

Python appends prefixes to a list, while Java allocates an `int[]` of the final length first.
The constraints explicitly bound all prefix products, suffix products, and answers to signed 32-bit values, making Java `int` safe.
Neither reference modifies `nums` or allocates separate prefix and suffix arrays.
