## Intuition

Only vowels move, so the other characters can stay exactly where they are.
A left pointer finds the next vowel from the front, while a right pointer finds the next vowel from the back.
Swapping those two vowels reverses their order, and moving both pointers inward makes each vowel pair permanent.

## Brute force

A direct approach could collect all vowels, reverse that collection, and scan the string again to replace vowel positions.
That takes O(n) time but uses O(n) extra space for the characters and the reversed vowel list.
The two pointer approach keeps the same linear time while using the mutable character array as its workspace.

## Approach

1. Convert s into a mutable characters list or array.
2. Keep left at the first position and right at the last position.
3. Advance left over consonants and symbols.
4. Decrease right over consonants and symbols.
5. When both positions hold vowels, swap them and move both pointers.
6. Join the updated characters and return the result.

## Walkthrough

Example 1 uses s = "hello".

| left | right | action | characters |
| ---: | ---: | --- | --- |
| 0 | 4 | left skips h | hello |
| 1 | 4 | swap e and o | holle |
| 2 | 3 | left skips l | holle |
| 3 | 3 | pointers meet; stop | holle |

The returned string is "holle".

## Complexity

Let n be the string length.
Each pointer moves only inward, so scanning takes O(n) time.
The mutable character list or Java char array uses O(n) space, and the returned string also contains O(n) characters.

## Edge cases

A string with no vowels is unchanged.
A single vowel needs no swap.
Uppercase vowels are recognized separately from consonants, and their case travels with the character.
Symbols and spaces are skipped without changing positions.

## Common mistakes

- Treating y as a vowel changes the required result.
- Moving a pointer after seeing a vowel can skip the swap partner.
- Sorting vowels instead of reversing their encounter order changes the problem.
- Forgetting the final join or String construction returns the workspace instead of text.

## Language notes

Python creates a list because strings cannot be changed in place.
Java uses a char array and creates the result String after the swaps.
Both use a constant size vowel lookup, while Python set membership and Java indexOf perform the same classification.
