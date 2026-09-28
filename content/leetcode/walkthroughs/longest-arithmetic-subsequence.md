## Intuition
An arithmetic subsequence is determined by its final value and common difference.
For each new value, extend the best subsequence ending at a previous value with the same difference.

## Brute force
Enumerating every subsequence is exponential in N.
The dynamic program merges all subsequences that end at the same index and difference.

## Approach
1. Give each array index a map from difference to best length ending there.
2. For a pair of indices `previous < current`, compute `difference = nums[current] - nums[previous]`.
3. Extend the previous map entry if present, otherwise start a length-two sequence.
4. Record the largest length seen.

## Walkthrough
Example 1 is `[3,6,9,12]`.
At 6, the pair `(3,6)` creates difference 3 with length 2.
At 9, `(6,9)` extends that difference to length 3, and at 12, `(9,12)` extends it to length 4.
The maximum length is therefore `4`.

## Complexity
Every ordered pair of indices is examined, giving O(N^2) time.
The per-index maps contain O(N^2) total difference entries in the worst case.
Both language references retain these maps and use O(N^2) auxiliary space.

## Edge cases
An array of one value has no pair, but the local constraints provide enough values for the returned sequence length.
Repeated values produce difference zero and extend correctly.
Negative differences are valid map keys and require no special branch.

## Common mistakes
Initializing every pair with length one misses that a pair already has length two.
Updating only one direction loses subsequences whose difference is negative.
Using a global difference map combines sequences ending at different indices incorrectly.

## Language notes
Python uses one dictionary per index and `get` with a default length of one before adding the new pair.
Java uses an array of `HashMap<Integer,Integer>` and updates the global maximum after each pair.
