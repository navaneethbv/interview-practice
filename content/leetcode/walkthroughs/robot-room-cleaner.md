## Intuition

The robot exposes no coordinates or map, so the algorithm assigns virtual coordinates to the cells it discovers.
Depth first search explores each reachable coordinate and records the robot's facing direction on entry.
After exploring one direction, a five-call reversal returns the robot to the same cell and orientation before the next direction.

## Brute force

Without a visited set, the robot could repeatedly enter the same open cycle and never finish.
A blind movement sequence also cannot know which branches remain unexplored.
Tracking virtual coordinates turns the unknown room into a finite graph search while using only allowed robot operations.

## Approach

1. Start at virtual coordinate (0,0), facing direction zero for up.
2. Mark the current coordinate visited and call clean.
3. Try four directions relative to the entry orientation.
4. When move succeeds into an unseen coordinate, explore that child with a new explicit frame in Python or a recursive call in Java.
5. Turn around, move back, and turn around again to restore the caller state.
6. Turn right once after each attempted direction.

## Walkthrough

Example 1 has open cells (0,0), (0,1), (1,1), and (1,2).

| current coordinate | facing | action | visited cells |
| --- | --- | --- | --- |
| (0,0) | up | move right to (0,1) | (0,0),(0,1) |
| (0,1) | right | move down to (1,1) | plus (1,1) |
| (1,1) | down | move right to (1,2) | plus (1,2) |
| (1,2) | right | all new moves blocked or visited | all four cells |
| (1,1) | restored | backtrack and try remaining directions | unchanged |

Every reachable open cell is cleaned once, so the judge displays all four coordinates.

## Complexity

Let R be the number of reachable cells.
Each cell is entered once and each of four directions is attempted, so the logical work is O(R).
The robot performs a constant number of turns and possible five-call backtracks per direction, also O(R) operations.
The visited set and explicit Python frame stack or Java recursion stack use O(R) space.

## Edge cases

A one-cell room is cleaned and then all movement attempts fail.
Disconnected open cells remain untouched because move cannot cross a wall.
Cycles are safe because virtual coordinates are marked before exploration.
The starting cell is always open under the contract.

## Common mistakes

- Omitting the reverse movement leaves the robot in a child cell for the next sibling.
- Marking a cell after recursion allows cycles to re-enter it.
- Using absolute directions after a turn loses the robot's current orientation.
- Reading the room or coordinates directly violates the interactive contract.

## Language notes

Python uses coordinate tuples and explicit frames containing row, column, entry direction, and the next direction offset.
This avoids Python recursion-depth failures on a valid 1000-cell corridor.
Java uses coordinate strings because the harness provides the Robot interface but no coordinate object.
Java uses recursive traversal and clears its instance set at the public entry point so a reused Solution instance starts clean.
Python creates a fresh local visited set for each call.
