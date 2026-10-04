## Intuition

Only ASCII letters matter, so punctuation, digits, and spaces can be skipped as the pointers move inward.
Compare retained letters without regard to case.
This achieves the same result as filtering and lowercasing the whole sentence, while avoiding an extra string.

## Brute force

Construct a lowercase string containing only letters, reverse it, and compare the two strings.
This takes linear time but allocates storage proportional to the number of retained letters.

## Approach

Start `left` and `right` at the sentence's ends.
If the left character is not an ASCII letter, advance only the left pointer.
Otherwise, if the right character is not a letter, move only the right pointer.
When both are letters, compare their lowercase forms and return false on a mismatch.
For a match, move both pointers inward.
Return true when they meet or cross.
Each iteration either discards an irrelevant character or validates one mirrored pair, so no relevant letter is lost.

## Walkthrough

Example 1 is `Bob wondered, 'Now, Bob?'`.
Ignoring nonletters and case yields `bobwonderednowbob`.
The outside comparisons match b with b, o with o, and b with b.
Continuing inward matches w, o, n, d, and e with their corresponding mirrored letters around the center.
Every retained pair agrees, so the result is true despite spaces, punctuation, and uppercase letters in the original sentence.

## Complexity

Each pointer moves across at most n characters in total.
Both references therefore take O(n) time and O(1) auxiliary space.
They lowercase one character at a time rather than allocating a normalized copy of the full input.

## Edge cases

An empty sentence or one containing no letters is palindromic under this contract.
Digits are ignored even when they would change the result of an alphanumeric palindrome check.

## Common mistakes

Do not use an alphanumeric test, since numeric characters must be skipped.
Move only the pointer whose current character is being discarded.

## Language notes

Both helpers explicitly restrict accepted lowercase characters to a through z.
Python uses `lower`; Java uses `Character.toLowerCase`, followed by the same ASCII range check.
