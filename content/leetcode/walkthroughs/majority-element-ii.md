## Intuition

At most two values can occur more than one third of the time.
The Boyer-Moore extension keeps two candidates and cancels three different values at a time.
A second pass verifies the surviving candidates because counters alone are only potential evidence.

## Brute force

A frequency map can count every value and return counts above n divided by three.
That uses O(n) additional space.
Candidate cancellation reduces the workspace to constant size before verification.

## Approach

1. Track two candidate values and their counters.
2. Increase the matching candidate, or replace an empty candidate.
3. When both candidates differ from the value, decrement both counters.
4. Recount both candidates in a verification pass.
5. Return only candidates whose verified count exceeds one third of n.

## Walkthrough

Example 1 is [3,2,3].
The first 3 becomes the first candidate.
The 2 becomes the second candidate.
The final 3 increments the first candidate, whose verified count is 2, while 2 has count 1.
Because 2 is not greater than one third of 3, the result is [3].

## Complexity

The candidate pass and verification pass take O(n) time.
Only two candidates and counters are stored, so auxiliary space is O(1).
The returned list has at most two values and is O(1) output space.
The cancellation proof depends on the one-third threshold.

## Edge cases

An empty input returns an empty list.
There may be zero, one, or two qualifying values.
A candidate that survives cancellation may still fail verification.
Equal candidate values must not be returned twice.

## Common mistakes

- Returning candidates without a verification pass includes false survivors.
- Using a one-candidate majority algorithm misses the second possible value.
- Counting values at least one third includes an invalid boundary.
- Decrementing only one counter breaks triple cancellation.

## Language notes

Python uses None as the initial candidate marker and recounts with booleans.
Java initializes distinct integer candidates and explicitly avoids duplicate output.
Both methods preserve constant auxiliary space.
