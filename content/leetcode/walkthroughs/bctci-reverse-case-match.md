## Intuition

The two compared words are interleaved inside the same input, but they can be read without constructing either one.
One pointer extracts lowercase letters from left to right, while the other extracts uppercase letters from right to left.
Each pair is compared after lowercasing the uppercase letter.

## Brute force

Build separate lowercase and uppercase subsequences, reverse and normalize the uppercase one, then compare them.
That takes linear time but allocates O(n) extra characters.

## Approach

Initialize `lower` at the first index and `upper` at the last index.
Repeat exactly half the input length times, since the contract guarantees equal lowercase and uppercase counts.
Advance `lower` until it identifies a lowercase character.
Retreat `upper` until it identifies an uppercase character.
Return false if those letters differ after case normalization.
Otherwise move both pointers past their consumed characters and continue.
Return true if every pair matches.
The pointers may cross in physical position because they are reading different subsequences, so crossing is not the loop's stopping condition.

## Walkthrough

Example 1 is `haDrRAHd`.
The lowercase pointer reads h, a, r, and d from left to right.
The uppercase pointer reads H, A, R, and D from right to left.
These pairs agree after normalization, producing the word `hard` on both sides.
The method returns true after four comparisons, despite the mixed placement of the letter cases.

## Complexity

Each pointer moves through the string at most once.
Both references therefore take O(n) time and O(1) auxiliary space.
No filtered substrings or reversed copies are allocated.

## Edge cases

Empty input returns true because there are zero pairs to inspect.
All lowercase letters may appear before all uppercase letters, or the cases may alternate arbitrarily.

## Common mistakes

Do not stop simply because the pointers cross.
The guaranteed equal case counts are what keep the unbounded inner skip loops within valid indices.

## Language notes

Python uses `islower`, `isupper`, and `lower`.
Java uses the corresponding `Character` methods.
The English-letter contract avoids broader Unicode case-mapping differences between those APIs.
