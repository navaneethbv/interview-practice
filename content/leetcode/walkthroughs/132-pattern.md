## Intuition
A 132 pattern needs indices i less than j less than k with `nums[i] < nums[k] < nums[j]`.
Scanning from right to left keeps a decreasing stack of possible high values and a `middle` value representing the best discovered nums[k].

## Brute force
Checking all triples takes O(N^3) time.
A sorted-prefix or binary-search variant can improve that, while the monotonic stack reaches linear time.

## Approach
1. Scan values from right to left.
2. If the current value is below `middle`, it can serve as nums[i] and the stored middle is nums[k], so return true.
3. While stack values are below the current value, pop them and promote each to the middle candidate.
4. Push the current value as a future nums[j] candidate.

## Walkthrough
Example 1 is `[2,5,3]`, scanned as 3, then 5, then 2.
The stack starts with 3; seeing 5 pops 3 and stores `middle = 3`, then pushes 5.
Seeing 2 finds `2 < 3`, so the triple `(2,5,3)` satisfies the pattern and the method returns true.

## Complexity
Each value is pushed and popped at most once, so the time is O(N).
The monotonic stack uses O(N) auxiliary space.

## Edge cases
An increasing array never creates a lower value after a valid middle and returns false.
Duplicate values do not satisfy strict inequalities and remain protected by the comparison choices.
Arrays with fewer than three values cannot form the pattern.

## Common mistakes
Scanning left to right without a structure for the middle candidate loses the required ordering.
Allowing `value <= middle` accepts equality even though the inequalities are strict.
Popping values in the wrong direction can discard a valid high candidate.

## Language notes
Python stores the stack as a list and uses negative infinity for the initial middle value.
Java uses an `ArrayDeque<Integer>` and `Integer.MIN_VALUE` for the same sentinel.
