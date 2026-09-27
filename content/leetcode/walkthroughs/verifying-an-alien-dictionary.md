## Intuition
Lexicographic order is decided by the first differing character.
If one word is a proper prefix of the next, the shorter word must come first.

## Brute force
A naive solution can convert every word into a full rank tuple and compare those tuples.
That costs O(T) rank work and O(T) temporary storage for T total characters, even when the first character already decides a pair.
Pairwise indexed comparison stops early.

## Approach
1. Build a rank for each alphabet character.
2. Compare each adjacent pair from left to right.
3. Return at the first differing rank comparison.
4. If all shared characters match, require the first word to be no longer than the second.

## Walkthrough
Example 1 compares `hello` and `leetcode` under order `hlabcdefgijkmnopqrstuvwxyz`.
The first characters are `h` and `l`.
The custom order ranks `h` before `l`, so this adjacent pair is correctly ordered.
There are no other pairs, so the method returns `true`.

## Complexity
Let T be the total number of characters in all words.
Building ranks costs O(26), and pairwise checks cost O(T) worst-case time.
The rank array or map uses O(26) space, and indexed loops avoid a copied `words[1:]` list.

## Edge cases
Equal words are ordered correctly.
A shorter exact prefix must come first, as in `app` before `apple`.
A first differing character decides without inspecting the suffix.

## Common mistakes
Checking only whether every adjacent word starts with the same letter is insufficient.
Treating a longer prefix as smaller reverses the prefix rule.
Using normal English ordering ignores the supplied alphabet.

## Language notes
Python uses a character-to-rank dictionary and indexed pair helper.
Java uses a fixed 26-element rank array and `charAt`, avoiding `toCharArray` buffers.
