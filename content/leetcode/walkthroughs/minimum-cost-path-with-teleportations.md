## Intuition
Normal moves go only right or down and pay the destination cell's value.
A teleport can move to any cell whose value is no greater than the current cell, so for each value level we need the best distance among all eligible source cells.

## Brute force
Trying every teleport destination at every step costs O(K(RC)^2).
Grouping cells by value and taking suffix minima reduces one teleport round to O(RC log(RC)) in the Python map representation.

## Approach
1. Initialize the distance grid and relax ordinary right and down moves.
2. For one teleport round, record the best distance at each cell value.
3. Sweep values from high to low so each value receives the best source whose value is at least it.
4. Replace every cell with that teleport distance, relax ordinary moves again, and repeat K times.

## Walkthrough
Example 1 is `[[5,1],[2,3]]` with one teleport.
The ordinary path to the bottom-right costs `1 + 3 = 4` or `2 + 3 = 5` under destination charging.
The source cell has value 5 and distance 0, so the teleport can reach every cell with value at most 5, including the destination value 3 at cost 0.
The final answer is 0.

## Complexity
Let M be the number of cells and U the number of distinct values.
Python sorts the U levels once, then each of K rounds performs O(M + U) work, for O(M + U log U + K(M + U)) expected time.
Java rebuilds a `TreeMap` and performs logarithmic lookups each round, giving O(M + KM log(U + 1)) time.
The Python grids, map, and rebuilt grid use O(M + U) space, while Java's `TreeMap` and grids use O(M + U) space.

## Edge cases
With K equal to zero, only right and down paths are considered.
A teleport can be useful even when the destination is not directly reachable by movement.
Repeated values share one best level entry and do not need separate sorting keys.

## Common mistakes
Charging the source cell for a normal move adds one cost too many.
Allowing teleports from a lower value to a higher value violates the value restriction.
Skipping the movement relaxation after a teleport misses paths that continue normally afterward.

## Language notes
Python stores unique levels in a sorted list and uses a value-to-best dictionary.
Java uses a reverse-order `TreeMap` and a fresh long distance grid each round.
