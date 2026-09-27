## Intuition
After each move, probability mass is distributed equally across the eight knight destinations.
Keep only the probability at each board cell for the current step.

## Brute force
Enumerating every sequence of k moves takes O(8^k) time.
It can count paths that have already left the board and requires recursion depth k.
Dynamic programming merges paths that reach the same square.

## Approach
1. Put probability 1 at the starting cell.
2. For each move, allocate a fresh board of zero probabilities.
3. Distribute each current cell's probability divided by 8 to legal destinations.
4. Sum the final board.

## Walkthrough
Example 1 has a 3 by 3 board, one move, and start `(0, 0)`.
The legal destinations are `(1, 2)` and `(2, 1)`.
Each has probability one eighth, while the other six moves leave the board.
The final board sum is therefore 0.25, matching the expected result.

## Complexity
For board size n and k moves, the dense Java board costs O(kn^2) time and O(n^2) space per retained board.
Python stores only nonzero cells, with O(k n^2) worst-case time and O(n^2) peak probability storage.

## Edge cases
With k zero, the starting probability is one.
A one-cell board loses all probability after any move.
Corner and edge starts have fewer legal moves than center starts.

## Common mistakes
Dividing only after summing paths changes each move's probability.
Keeping off-board destinations incorrectly preserves dead probability.
Mutating the current board in place mixes move counts.

## Language notes
Python uses a dictionary of occupied coordinates.
Java uses dense `double[][]` buffers and sums them with a helper.
