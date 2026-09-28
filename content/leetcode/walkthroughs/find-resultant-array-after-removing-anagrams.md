## Intuition

Adjacent words are anagrams exactly when their sorted character signatures match.
Keeping the first word of each consecutive signature run removes only the required adjacent duplicates.

## Brute force

Comparing every adjacent pair with repeated character counts adds bookkeeping for each letter.
Sorting each word gives a direct canonical signature.

## Approach

1. Sort the characters of each word to form its signature.
2. Compare it with the previous signature.
3. Append the original word only when the signature changes.
4. Update the previous signature for the next word.

## Walkthrough

For Example 1, `abba`, `baba`, and `bbaa` all sort to `aabb`, so only `abba` remains.
`cd` changes the signature to `cd` and is appended.
The final `cd` has the same signature as the previous word and is removed, producing `['abba','cd']`.

## Complexity

If the input has total character count C and word lengths are l_i, sorting costs O(sum l_i log l_i) time.
The signatures and returned list use O(C) space in Python and Java, including each temporary character array.

## Edge cases

Only consecutive anagrams are removed, so a later word can reappear after a different signature.
Identical words are consecutive anagrams.
Words with different lengths cannot share a signature.

## Common mistakes

Compare with the immediately previous signature, not every earlier word.
Append the original spelling rather than the sorted signature.
Update the previous signature only when a word is accepted or, equivalently here, after every comparison.

## Language notes

Python's `sorted(word)` creates a character list before joining.
Java sorts a copied `char[]` and constructs a signature string.
