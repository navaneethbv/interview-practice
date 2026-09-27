## Intuition

All nums values are positive, so extending a window can only increase its sum.
Once a window reaches target, moving its left edge rightward tests every shorter valid suffix.
A sliding window therefore finds the shortest qualifying interval in one pass.

## Brute force

Checking every start and extending every end can take O(n squared) time.
Prefix sums can find each interval sum faster, but still require searching many possible endpoints.
The positive-value property makes the shrinking sliding window linear.

## Approach

1. Start the left edge and running sum at zero.
2. Extend the right edge and add its value.
3. While the sum reaches target, update the shortest length.
4. Remove the leftmost value and advance left to search for a shorter window.
5. Return the best length or zero when no window reached target.

## Walkthrough

Example 1 has target 7 and nums [2,3,1,2,4,3].
After the value 2 at index 3, the sum is 8 and the window length is 4.
Removing 2 leaves 6, so the value 4 at index 4 raises the sum to 10 and shrinking finds [4] with sum 4 after testing length 3.
The final value 3 raises the sum to 9, and shrinking finds [4,3] with sum 7 and length 2.
That length is the best result, so the method returns 2.

## Complexity

Each value enters and leaves the sliding window at most once, giving O(n) time.
The method uses O(1) auxiliary space.
The returned result is one integer.
The positive-number guarantee is essential to the shrinking proof.

## Edge cases

A single value at least target returns 1.
If the total sum is below target, the method returns zero.
A window may become shorter repeatedly during one right-edge step.
The input array remains unchanged.

## Common mistakes

- Shrinking only once misses shorter qualifying suffixes.
- Expanding after a sum reaches target without checking the current window misses the answer.
- Applying this window method to negative values breaks monotonicity.
- Returning the window sum instead of its length changes the contract.

## Language notes

Python tracks the current total with integer variables.
Java uses the same two pointers and int sums under the stated constraints.
Both references avoid an auxiliary prefix array.
