## Intuition
Words must stay in their original positions while each word's characters reverse.
Splitting at the guaranteed single spaces isolates the words, and reversing each isolated string cannot affect its neighbors.
Joining with the same separator restores the original word spacing.

## Brute force
A character-by-character scan could reverse each range in place, but the method returns a new string and the input size allows simpler string operations.
The split, reverse, and join pipeline still touches every character a constant number of times.

## Approach
1. Split the sentence on spaces.
2. Reverse each word independently.
3. Join the reversed words with one space.

## Walkthrough
Example 1 is `"code every day"`.
Splitting yields `code`, `every`, and `day`.
Their reversed forms are `edoc`, `yreve`, and `yad`.
Joining them with spaces produces `"edoc yreve yad"` while preserving word order.

## Complexity
The characters are copied and reversed a constant number of times, so time is O(N).
The split words and returned string use O(N) space.

## Edge cases
A one-word sentence simply reverses that word.
The input guarantees no leading or trailing spaces, so splitting does not create boundary empties.
Single-character words remain unchanged.

## Common mistakes
Reversing the complete sentence also reverses word order.
Sorting letters instead of reversing them changes the word contents.
Using a separator other than one literal space breaks the statement's spacing contract.

## Language notes
Python builds reversed word strings with slicing.
Java uses `StringBuilder.reverse` for each split word and `String.join` for reconstruction.
Both preserve the original number and positions of spaces.
