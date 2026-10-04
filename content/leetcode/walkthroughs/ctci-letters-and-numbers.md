## Intuition

Treat a letter as plus one and a number as minus one.
A subarray has equal quantities exactly when its net sum is zero.
Two equal prefix balances therefore delimit a balanced subarray, and the earliest occurrence of a balance gives its longest possible span ending at the current index.

## Brute force

Enumerate every subarray and count letters and numbers within it.
Even carrying counts forward from each start requires O(n squared) work.
Prefix-balance lookup reduces each new endpoint to one expected constant-time map operation.

## Approach

Initialize `first_seen` with balance zero at index -1.
Update `balance` for each array entry.
Store the current index only if this balance has never occurred before.
Otherwise calculate the length since its earliest occurrence and update the best interval only for a strictly greater length.
Return the corresponding slice.
Keeping the earliest prefix index maximizes length, and strict improvement preserves the earliest answer among ties.

## Walkthrough

Example 1 has balances `1, 0, 1, 2, 1, 0, 1` after its successive entries.
Balance zero at index 1 gives the first two-element match.
At index 5, zero matches the initial prefix at -1, producing length six.
The final balance one yields another six-element span starting later, so the existing best is retained.
Return `["a", "1", "b", "c", "2", "3"]`.

## Complexity

For n entries, expected time is O(n) and the prefix map uses O(n) space.
The returned slice requires additional space proportional to the chosen subarray's length.

## Edge cases

An all-letter or all-number input has no nonempty balanced answer.
The initial zero balance allows a valid interval starting at index zero.

## Common mistakes

Replacing an earlier stored balance index shortens future candidates.
Using a greater-than-or-equal update would replace an equally long earlier interval with a later one.

## Language notes

Python uses `isalpha()` and Java uses `Character.isLetter` on the constrained entry representation.
Both retain first occurrences in a hash map and copy the selected range for the result.
