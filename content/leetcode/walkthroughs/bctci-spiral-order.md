## Intuition

The center already contains zero, so the remaining values can be written by walking a growing square spiral.
The first move is down, and after two legs the distance traveled on each side increases by one.
Keeping the current row, column, value, leg length, and direction is enough to reproduce that pattern.

## Approach

Create an `n x n` grid initialized with zero and start at its center.
Use the direction order down, left, up, right, which is clockwise for this coordinate layout.
For each leg length, walk two legs, turn after each leg, and then increase the leg length.
Stop immediately if the next value would equal `n * n`, because every valid cell has already been filled.

## Walkthrough

For Example 1, `n = 3` starts at row 1 and column 1 with value zero.
The first leg moves down to `[2][1]` with one, then the second leg moves left to `[2][0]` with two.
The next two legs move up twice and right twice, placing three, four, five, and six.
The final two legs move down three times and left three times, placing seven and eight before the grid is complete.
The resulting rows are `[4, 5, 6]`, `[3, 0, 7]`, and `[2, 1, 8]`.

## Complexity

Every cell is assigned once, so the running time is `O(n^2)`.
The returned grid uses `O(n^2)` space, apart from the constant traversal state.

## Edge cases

When `n` is one, the center is the only cell and the initial zero is already the complete answer.
The odd-size constraint guarantees that `n // 2` identifies a unique center.
The stop check prevents a final leg from stepping outside the grid after the last value.

## Common mistakes

Using right as the first direction produces a rotated spiral that does not match the contract.
Increasing the leg length after every turn instead of after every pair makes the spiral expand too quickly.
Writing a value before checking the limit can create an out-of-bounds coordinate on the final partial leg.

## Language notes

Python stores directions as tuples and updates the row and column together.
Java uses the same four direction pairs and guards both the leg and step loops with the value limit.
Both references mutate only the newly allocated grid and leave no dependence on labels or other inputs.
