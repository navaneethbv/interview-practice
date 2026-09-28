## Intuition
Only the number of students wanting each sandwich type matters for deciding whether the top sandwich can be eaten.
If nobody remaining wants the current top type, rotating the queue forever cannot change the outcome.
Counting preferences lets the simulation stop immediately at that point.

## Brute force
Simulating every queue rotation can repeatedly move the same students and take quadratic time.
A deque is clearer but still performs work that the preference counts summarize.

## Approach

1. Count students preferring sandwich types 0 and 1.
2. Process sandwiches from top to bottom.
3. Consume a sandwich when its preference count is positive and decrement that count.
4. Stop when the top type has no remaining matching student.
5. Return the remaining student count.

## Walkthrough

For Example 1, `students = [1,1,0,0]` and `sandwiches = [0,1,0,1]`, the initial counts are two for each type.
The top type 0 is eaten, leaving one type 0 and two type 1 preferences.
Type 1 is then eaten, followed by the remaining type 0 and type 1 sandwiches, so nobody remains hungry.
For the second example, three students want type 1 when the top eventually becomes type 0.
The type 0 count reaches zero, so those three students cannot make progress and the answer is 3.

## Complexity
Counting students takes O(n) time.
The sandwich scan takes O(n) more time, with O(1) additional space because there are only two types.

## Edge cases
If the first sandwich type has no matching preference, all students remain.
If all sandwiches are consumed, return zero.
The arrays have equal length by contract.

## Common mistakes
Do not stop merely because the next student in the queue mismatches.
Stop only when the remaining count for the top sandwich type is zero.
The sandwich list is already ordered top to bottom, so do not sort it.

## Language notes
Python uses a two-entry count list.
Java uses integer counters or an equivalent fixed-size array and returns the remaining student count.
