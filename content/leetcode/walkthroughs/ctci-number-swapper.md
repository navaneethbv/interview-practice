## Intuition

XOR can combine two integers so that applying the same operation again recovers either original value.
Three XOR assignments move the values through that reversible relationship without a temporary variable.
The sequence also works when the two inputs are equal because XOR with itself is zero.

## Approach

First set `a` to `a ^ b`.
Then set `b` to the new `a ^ b`, which recovers the original `a`.
Finally set `a` to the current `a ^ b`, which recovers the original `b`.
Return the swapped pair in `[a, b]` order.

## Walkthrough

For Example 1, starting with `a = 3` and `b = 9`, the first assignment stores their combined XOR in `a`.
The second assignment uses that combined value to recover three into `b`.
The third assignment recovers nine into `a`, so the result is `[9, 3]`.
For equal inputs such as negative four and negative four, the first XOR is zero, and the remaining two operations restore the same value in both positions.

## Complexity

The method performs exactly three bitwise operations, so it runs in `O(1)` time.
It uses `O(1)` auxiliary space and returns a constant-size two-element array.
The arithmetic is performed in the input integer width, preserving two's complement bit patterns.

## Edge cases

Equal values remain equal after the swap because XOR self-cancels.
Zero and negative values need no special branch.
The minimum and maximum signed integers are swapped as bit patterns without arithmetic overflow.

## Common mistakes

Using addition and subtraction can overflow even when the final values would be valid.
Changing the order of the XOR assignments loses one of the original values.
Returning the intermediate combined value instead of the final pair does not perform a swap.

## Language notes

Python's integers are unbounded, but the XOR sequence still gives the same mathematical values for this contract.
Java's `int` operations naturally preserve 32-bit two's complement behavior.
Both references return a new two-element result and do not mutate caller-visible variables beyond local parameters.
