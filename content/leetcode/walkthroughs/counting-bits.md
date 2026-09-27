## Intuition

Shifting a nonnegative integer right by one removes its final binary digit.
The remaining prefix already has a known bit count when values are processed in increasing order.
Add back one exactly when the removed digit was one.

## Brute force

Count bits independently for every integer from zero through `n`.
A bit-by-bit approach takes O(n log(n + 1)) operations in a variable-width analysis and repeats work for many shared binary prefixes.
Dynamic programming reuses each prefix count.

## Approach

1. Allocate `result` with `n + 1` zeros, including the base case `result[0] = 0`.
2. For each `value` from 1 through `n`, find its shorter binary prefix with `value >> 1`.
3. Set `result[value] = result[value >> 1] + (value & 1)`.
4. Return the completed array.

The dependency index is always smaller than `value`, so it has already been computed.
Even values append a zero bit to their prefix and retain its count.
Odd values append a one bit and increase the count by one.

## Walkthrough

Example 1 uses `n = 3`.

| `value` | Binary | Prefix index | Final bit | `result[value]` |
| --- | --- | --- | --- | --- |
| 0 | `0` | Base case | 0 | 0 |
| 1 | `1` | 0 | 1 | 1 |
| 2 | `10` | 1 | 0 | 1 |
| 3 | `11` | 1 | 1 | 2 |

The final array is `[0, 1, 1, 2]`.
Both 2 and 3 reuse the already computed count for 1.

## Complexity

- Time: O(n), with one constant-time transition per positive value.
- Space: O(n) for the returned array, with O(1) extra state beyond it.

## Edge cases

For `n = 0`, the loop is empty and the answer is `[0]`.
Powers of two have count one because repeated prefix reductions reach one.
The last array entry includes `n` itself, rather than stopping just before it.

## Common mistakes

- Allocating only n entries omits the required zero-through-n endpoint.
- Adding the original value instead of `value & 1` does not count bits.
- Iterating downward reads prefix states before they are available.

## Language notes

Java initializes every element of a new `int[]` to zero.
Python constructs the same initial state with list multiplication.
All values are nonnegative, so arithmetic right shift has the intended prefix-removal behavior in both languages.
