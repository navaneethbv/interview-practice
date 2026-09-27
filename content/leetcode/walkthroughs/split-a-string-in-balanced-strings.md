## Intuition
A running difference between L and R counts is zero exactly when the current prefix is balanced.
Cutting at the earliest possible zero leaves the largest remaining suffix for additional pieces.
Because the whole string is balanced, removing a balanced prefix leaves another balanced suffix.

## Brute force
Try every subset of the n minus one possible boundaries and verify every resulting piece.
This takes O(n*2^n) time with straightforward rescanning of each proposed partition.
The greedy approach recognizes all useful cut positions during one scan.

## Approach
1. Set `balance` and `parts` to zero.
2. Add one to balance for L and subtract one for R.
3. Whenever balance returns to zero, increment the piece count.
4. Return the total count after the final character.

Balance is already zero at each cut, so no separate reset is needed.
Every valid partition can cut only at positions where the overall prefix is balanced: the earlier complete pieces all have net balance zero.
Cutting at every such position is therefore valid and uses every available boundary, proving that the count is maximal.
A longer balanced piece could combine several of these earliest pieces, but that would only reduce their number.

## Walkthrough
Example 1 is `LRLR`.
Reading the first L changes balance from zero to one.
The first R changes it back to zero, so `parts` becomes one and the first piece is LR.
The next L raises balance to one again.
The final R returns balance to zero, so `parts` becomes two.
The returned value is 2, representing the partition `LR | LR`.

## Complexity
Every character is examined once, so time is O(n).
Only two counters are maintained, giving O(1) auxiliary space.
Neither reference creates the actual substring pieces, since the requested result is only their maximum count.

## Edge cases
A string such as LLRR reaches zero only at its end and contributes one piece.
An alternating string returns to zero after every second character and produces n divided by two pieces.
A prefix can have more R characters than L characters; negative balance is valid and still detects equality when it returns to zero.

## Common mistakes
- Counting L-to-R transitions does not measure equal character counts.
- Splitting at nonzero balance creates an invalid piece.
- Rejecting negative intermediate balance incorrectly treats this as a parentheses-validation problem.

## Language notes
Python iterates directly over characters.
Java uses `charAt` to avoid allocating a character-array copy.
The local contract guarantees only L and R characters and a balanced complete string.
