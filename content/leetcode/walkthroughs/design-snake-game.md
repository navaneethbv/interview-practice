## Intuition

Only the head and tail change on a move: the head gains a cell and, unless food is eaten, the tail loses one. A deque models that, and a set of occupied cells answers whether the new head collides.

## Approach

1. Store the body in a deque from head to tail and its cells in a set.
2. Compute the new head; return -1 if it leaves the grid.
3. If it is the next food, keep the tail and increase the score.
4. Otherwise remove the tail first, then return -1 if the head lands on the body.
5. Add the new head and return the score.

## Walkthrough

In Example 1 the snake moves right to (0, 1), down to (1, 1) and right onto the first food at (1, 2). Up and left reach (0, 1), the second food, giving score 2. Moving up from row 0 leaves the grid, so the result is -1.

## Complexity

- Time: O(1) per move.
- Space: O(width * height).

## Edge cases

- Moving into the cell the tail just left is legal, which is why the tail is removed before the collision check.
- When all food is eaten, later moves never grow the snake.
- Only the next piece of food matters, even if a later piece is at the head's cell.

## Common mistakes

- Checking collision before removing the tail.
- Checking every food cell instead of only the next one.
- Scanning the body list for collisions, which is O(length) per move.
