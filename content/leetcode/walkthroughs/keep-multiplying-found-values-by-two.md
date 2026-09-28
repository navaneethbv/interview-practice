## Intuition
The operation asks only whether a value exists in the input, not where it occurs or how many copies it has.
A set answers that membership question efficiently.
Since the starting value is positive and doubles after every match, the process eventually exceeds every input value and stops.

## Brute force
Scan the entire array whenever checking the current value.
If it is present, double it and start another scan; otherwise return it.
For d successful doublings and n input elements, this takes O(n*(d+1)) time with constant extra space.
Building a set avoids repeating the same array search.

## Approach
1. Insert every input value into a set.
2. While the set contains the current original value, multiply that value by two.
3. Return the first value that is absent.

The set exactly represents whether any matching input element exists.
Each successful loop iteration performs the operation required by the statement, and the loop condition stops at precisely the first failed search.
Elements are not consumed when found: the task changes the current value, not the available input.
Positive values guarantee strict growth, establishing termination.

## Walkthrough
Example 1 has `nums = [2,4,8]` and `original = 2`.
The set contains 2, so the current value becomes 4.
It also contains 4, so the value becomes 8.
It contains 8, so the value becomes 16.
The set does not contain 16, ending the loop.
The returned answer is 16.
The same chain would be followed if the input values appeared in a different order.

## Complexity
Set construction takes expected O(n) time, followed by expected O(d+1) membership work.
Total expected time is O(n+d), with O(n) auxiliary space in the worst case.
Because each successful step doubles a positive value bounded by the largest input value M, d is O(log(M+1)).

## Edge cases
If the starting value is absent, it is returned immediately.
Duplicate input values do not cause extra doublings of the same current value.
A gap in the doubling chain stops the process even if larger multiples exist.

## Common mistakes
- Continuing a single forward scan can miss a needed value that appeared earlier in the array.
- Doubling once per duplicate treats membership as a count-based operation.
- Returning the final found value instead of the first absent value stops one step too early.

## Language notes
Python uses a set and Java uses `HashSet<Integer>`.
The local input values and starting value are at most one thousand, so the first absent doubled value is at most two thousand and fits Java `int`.
