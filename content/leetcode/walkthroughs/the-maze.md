## Intuition
The ball does not stop after one cell, so a state is a stopping position rather than every traversed cell.
From each stop, roll in four directions until a wall or boundary and explore each new stop once.

## Brute force
A naive graph could add every open cell as a node and simulate each direction from every cell.
That can take O(RC(R+C)) time because each of O(RC) cells may roll across a row or column.
It also stores O(RC) adjacency data.

## Approach
1. Start a stack with the start position and mark it visited.
2. For each direction, advance while the next cell is open.
3. Push the final stop if it has not been visited.
4. Return true when a popped stop equals the destination.

## Walkthrough
Example 1 is a one-row maze `[0, 0, 0]`, start `[0, 0]`, destination `[0, 2]`.
From start, rolling right advances through columns 1 and 2, then stops at column 2 because the boundary follows it.
That stop is added to the stack.
The next pop equals the destination, so the method returns `true`.
The ball never needs to stop at column 1 for this contract.

## Complexity
For R by C cells, there are at most RC stopping states.
Each expansion can scan O(R + C) cells, giving O(RC(R+C)) worst-case time.
The visited set and stack use O(RC) space.

## Edge cases
If the start already equals the destination, the first pop succeeds.
A destination passed during a roll does not count unless the ball stops there.
Walls are never pushed or visited.

## Common mistakes
Checking every traversed cell incorrectly treats rolling as walking.
Marking only the start allows repeated stop exploration.
Stopping before the last open cell misses valid destinations at boundaries.

## Language notes
Python stores tuple stopping positions in a set.
Java stores primitive coordinate arrays in a deque and a boolean visited grid.
