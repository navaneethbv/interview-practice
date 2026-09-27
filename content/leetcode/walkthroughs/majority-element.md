## Intuition

Pair a majority value with any different value and remove both.
Because the majority appears more than half the time, it survives every such cancellation.
The candidate and vote_count variables simulate those cancellations without storing the pairs.

## Brute force

A frequency map uses O(n) auxiliary space.
Sorting finds the middle value in O(n log n).
The voting scan achieves linear time and constant space.

## Approach

1. Start with no active candidate and zero votes.
2. When vote_count is zero, choose the current value as candidate.
3. Add one vote for a matching value and subtract one for a different value.
4. Return candidate after the scan.

The existence guarantee means the final candidate is the majority and needs no second verification pass.

## Walkthrough

Example 1 uses nums = [3, 2, 3].
The first 3 becomes candidate with vote 1.
The 2 cancels one vote, returning the count to 0.
The final 3 becomes the new candidate with vote 1.
The result is 3.

## Complexity

- Time: O(n), for one pass through nums.
- Space: O(1), for candidate and vote_count.

## Edge cases

A one-element array returns its only value.
Negative and large values are handled as ordinary integers.
The majority may become the candidate again after a cancellation.
Without the existence guarantee, a verification pass would be required.

## Common mistakes

- Returning the first candidate instead of the final survivor.
- Resetting candidate without resetting the vote count.
- Assuming the input must be sorted.
- Applying the guarantee-free version without checking its final frequency.

## Language notes

Python uses a conditional expression for the vote change.
Java uses the same Boyer-Moore cancellation invariant with int variables.
