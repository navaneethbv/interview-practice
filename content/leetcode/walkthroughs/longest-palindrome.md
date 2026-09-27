## Intuition

Every character pair can occupy symmetric positions in a palindrome.
After using all possible pairs, at most one unpaired character can sit in the center.
Therefore the answer is the total even contribution plus one when any character remains unused.

## Brute force

Trying permutations of selected characters is factorial.
Counting frequencies identifies all usable pairs without constructing a palindrome.

## Approach

1. Count each character in s.
2. Add count // 2 * 2 for every character to paired_length.
3. Add one if paired_length is smaller than the input length.
4. Return the result.

## Walkthrough

Example 1 uses s = "abccccdd".
The pair contributions are 0 for a, 0 for b, 4 for c, and 2 for d.
Their total is 6, and one of the remaining a or b occurrences can occupy the center.
The algorithm therefore returns 7.

## Complexity

- Time: O(n + k), for counting input characters and scanning the frequency table.
- Space: O(k), where k is the character alphabet.

## Edge cases

A single character forms a palindrome of length 1.
Two different case variants cannot pair.
All even counts use the entire input.
Any odd count contributes its pair portion, and only one odd remainder contributes the center.

## Common mistakes

- Adding every odd remainder instead of only one center.
- Treating uppercase and lowercase characters as equal.
- Sorting the string when frequency counting is enough.
- Returning the number of distinct characters rather than a length.

## Language notes

Python Counter supports arbitrary character keys.
Java uses a 128-entry array because the input alphabet is English uppercase and lowercase.
