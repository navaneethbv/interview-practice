## Intuition

Each lock state has eight neighbors because one of four wheels can turn in either direction.
Breadth-first search discovers states in increasing turn count.

## Brute force

Depth-first search may follow a long route before finding a shorter one.
The state space has only 10,000 combinations, so BFS is the direct shortest-path method.

## Approach

1. Mark deadends and the starting state as visited.
2. Process states level by level.
3. Generate the plus-one and minus-one neighbor for every wheel.
4. Return the level when target is reached, or -1 when the queue empties.

## Walkthrough

Example 1:

With no deadends and target 0009, turning the last wheel backward once reaches 0009.
The start level is zero and the target is discovered at level one.
The answer is 1.

## Complexity

There are at most 10,000 states and eight generated neighbors per state.
Time and space are O(10,000), or O(1) under the fixed four-wheel domain.
Python creates neighboring strings by slicing, while Java creates char-array strings.

## Edge cases

If 0000 is blocked, the answer is -1.
The target can equal the start and returns zero when unblocked.
Visited states prevent cycles.

## Common mistakes

Do not enqueue a deadend.
Wrap digit 9 to 0 and digit 0 to 9.
Mark a state visited when enqueuing so duplicates do not multiply the queue.

## Language notes

Python yields neighbors through a helper generator.
Java uses an ArrayDeque and a helper that mutates a temporary char array.
The queue level records the exact number of turns used to reach each state.
