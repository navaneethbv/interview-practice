## Intuition

A string reads the same in both directions exactly when every pair of mirrored positions contains the same character.
Compare the outermost pair first, then move toward the center.
Any mismatch disproves the palindrome immediately, while matching outer pairs can be forgotten.

## Approach

Initialize `left` to zero and `right` to the last valid index.
While `left` is smaller than `right`, compare the characters at those positions.
Return false as soon as they differ.
Otherwise increment `left` and decrement `right` to examine the next inner pair.
If the pointers meet or cross without a mismatch, return true.
The loop invariant is that every position outside the remaining interval has already matched its mirrored partner.
Thus the final success covers all required comparisons, and an unmatched center character in an odd-length string needs no check against another position.

## Walkthrough

Example 1 is `level`.
The first comparison matches the `l` at index zero with the `l` at index four.
The next comparison matches the two `e` characters at indices one and three.
Both pointers then reach index two, containing `v`, so the loop stops.
All mirrored pairs matched and the method returns true.
The center character could be any lowercase letter without changing the success of those comparisons.

## Complexity

Both references compare at most half the string, taking O(n) worst-case time.
Only two indices are stored, so auxiliary space is O(1).
A mismatch near the ends permits an early return, but does not change the worst-case bound.

## Edge cases

Empty strings and single-character strings return true because the loop never runs.
Even-length strings finish by crossing pointers; odd-length strings finish by meeting at the center.

## Common mistakes

Advance both pointers after a successful comparison.
Do not normalize or discard characters here: the contract already provides lowercase letters, and every position participates.

## Language notes

Python indexes the string directly.
Java uses `charAt` and advances both indices inside the comparison expression.
The lowercase-English restriction makes Java's character-unit comparisons match the problem's intended alphabet exactly.
