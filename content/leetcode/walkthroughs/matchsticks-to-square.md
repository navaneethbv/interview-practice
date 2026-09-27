## Intuition

The total length must split into four equal targets, but choosing sticks for one side can affect every remaining side.
Depth-first search assigns the longest sticks first, and skipping equal side lengths removes symmetric branches.

## Brute force

Trying every assignment of each stick to one of four sides examines up to `4^m` assignments for `m` sticks.
The target check and duplicate-side pruning make the backtracking search practical for the stated limit of 15 sticks.

## Approach

1. Reject fewer than four sticks or a total not divisible by four.
2. Sort `sticks` in descending order and reject a stick longer than `target_length`.
3. Recursively place the current stick into each side that stays within the target.
4. In one recursion level, skip side lengths already tried, and undo a placement after an unsuccessful branch.
5. Succeed when every stick has been placed.

## Walkthrough

For Example 1, `matchsticks = [1, 1, 2, 2, 2]` has total 8 and target length 2.
Descending order is `[2, 2, 2, 1, 1]`.
The three 2s occupy three sides, then the two 1s are placed together on the remaining side.
All four side lengths become 2, so the search returns `true`.

## Complexity

The worst-case search takes `O(4^m)` time, with pruning often removing symmetric placements.
Sorting takes `O(m log m)`, and recursion plus the four side lengths use `O(m)` extra space.

## Edge cases

A total divisible by four can still fail when the individual lengths cannot form sides, as Example 2 shows.
Repeated lengths are valid separate sticks, and a zero target cannot occur because every stick is positive.

## Common mistakes

- Checking only total divisibility does not prove a partition exists.
- Sorting ascending creates much larger failed subtrees before discovering an oversized side.
- Treating equal side lengths as distinct at one level repeats equivalent work.

## Language notes

Python uses a private recursive method and a mutable side list, while Java passes an `int[]` of side lengths.
Java sums lengths in `long` because each individual length can be large even though the target eventually fits in an `int`.
