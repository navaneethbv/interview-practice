## Intuition

Coordinatewise maximum can never lower a coordinate.
Therefore any triplet that exceeds target in one coordinate can never participate in a successful merge.
Every safe triplet can contribute a coordinate that already equals target, and those contributions can be merged independently.

## Brute force

Enumerating every sequence of pairwise merges creates an enormous branching search.
The monotonicity of maximum reduces the question to whether each target coordinate is witnessed by some safe triplet.

## Approach

1. Keep three booleans in reached_coordinate.
2. For each triplet, skip it if any value exceeds the corresponding target.
3. For a safe triplet, mark every coordinate equal to its target coordinate.
4. Return whether all three booleans are true.

## Walkthrough

Example 1 uses triplets = [[2, 5, 3], [1, 8, 4], [1, 7, 5]] and target = [2, 7, 5].
The first triplet is safe and marks coordinate 0 because it has value 2.
The second triplet is rejected because 8 exceeds target coordinate 1.
The third triplet is safe and marks coordinates 1 and 2 with values 7 and 5.
All three coordinates are reached, so merging the first and third triplets can produce target.

## Complexity

- Time: O(3n), which is O(n), scanning each triplet's three coordinates.
- Space: O(1), for the three booleans.

## Edge cases

A triplet already equal to target marks every coordinate and succeeds.
A coordinate can be supplied by a different safe triplet than the other coordinates.
Any oversized coordinate permanently disqualifies its triplet.
The input always has length-three rows, so each coordinate check is defined.

## Common mistakes

- Allowing an oversized coordinate because another coordinate matches target.
- Requiring one triplet to equal all target coordinates.
- Simulating merges when only witness coordinates matter.
- Using minimum instead of coordinatewise maximum reasoning.

## Language notes

Python uses any with paired values from zip.
Java keeps the same check in exceedsTarget and uses a fixed boolean array.
