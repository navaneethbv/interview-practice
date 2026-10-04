## Intuition

Every valid number can be formed by multiplying an earlier valid number by 3, 5, or 7.
If the sequence is generated in order, each factor needs a pointer to the first value that has not yet produced a candidate.
Advancing every pointer that matches the chosen minimum removes duplicate candidates such as 15.

## Approach

Start `values` with one and set three pointers to zero.
At each step, form the candidates `values[pointer] * factor` for factors 3, 5, and 7.
Append the smallest candidate, then advance every pointer whose candidate equals that smallest value.
Return `values[k - 1]` after the sequence contains `k` entries.

## Walkthrough

For Example 1, the sequence begins one, three, five, seven, and nine.
The next candidates after nine include fifteen from three times five and fifteen from five times three, so the smallest is fifteen.
Both corresponding pointers advance, preventing fifteen from being appended a second time.
The sixth stored value is therefore fifteen.

## Complexity

Each of the `k` positions performs a constant amount of candidate work and pointer updates, giving `O(k)` time.
The values array uses `O(k)` space.
The answer and Java candidate products use 64-bit storage because the contract permits values beyond 32-bit range.

## Edge cases

`k = 1` returns the initial value one without entering the generation loop.
Duplicate candidates must advance all matching pointers, not just the first matching factor.
The factor order does not affect the numeric sequence because the minimum candidate is selected each time.

## Common mistakes

Advancing only one pointer for a duplicate inserts repeated values and shifts every later index.
Using a heap without duplicate handling can produce the same problem in a less transparent form.
Treating zero as the first value changes the mathematical sequence defined by the statement.

## Language notes

Python keeps factors in a tuple and computes a short candidate list on each iteration.
Java stores factors in a static array and compares each candidate again when advancing pointers.
Both implementations use the method name `getKthMagicNumber` and return a long-compatible result.
