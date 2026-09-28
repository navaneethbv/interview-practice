## Intuition

The answer is the smallest absolute index difference among entries equal to target.
A linear scan can update that minimum without storing target positions.

## Brute force

Building a list of every target index and sorting it adds storage without helping the distance calculation.
Each match can update the answer immediately.

## Approach

1. Initialize best to the array length.
2. Scan every index.
3. When its value equals target, minimize `abs(index - start)`.
4. Return best, which is finite by the contract.

## Walkthrough

For Example 1, target 5 occurs at index 4 and start is 3.
The scan finds distance `abs(4-3)=1`, so the answer becomes 1.
No other matching index can reduce it.

## Complexity

Time is O(n) and auxiliary space is O(1).
Neither reference copies the input array.

## Edge cases

If start already contains target, the answer is zero.
The target is guaranteed to occur at least once.
Matches on either side of start are handled symmetrically.
The initial length sentinel is replaced before return because the contract guarantees at least one matching value.
A match farther away never needs to be retained once a smaller distance has been found.
Scanning the whole bounded input also keeps the implementation independent of where matching values are clustered.

## Common mistakes

Use absolute distance.
Do not stop at the first match unless its distance is zero.
Initialize the sentinel larger than any possible index difference.

## Language notes

Python uses `enumerate` and `abs`.
Java uses `Math.abs` while retaining an integer sentinel.
