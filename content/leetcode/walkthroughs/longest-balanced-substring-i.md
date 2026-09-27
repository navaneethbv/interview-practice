## Intuition
A substring is balanced when all characters that appear have one common frequency.
For a fixed start, extend the end one character at a time and maintain both the number of distinct characters and the largest frequency.
The substring is balanced exactly when `largest_frequency * distinct_count` equals its length.

## Brute force
Enumerating substrings and recounting every frequency costs O(n^3) time.
Maintaining counts while extending each start removes one repeated scan.

## Approach

1. Choose each possible substring start.
2. Extend its end while updating character counts and the largest frequency.
3. Compute the distinct-character count from the map.
4. Mark the substring balanced when `largest_frequency * distinct_count` equals its length.
5. Keep the largest valid length.

## Walkthrough

For Example 1, `s = "aabbc"`, the prefix `aabb` has counts `a:2` and `b:2`, so its length 4 equals `2 * 2` and it is balanced.
Adding `c` creates counts 2, 2, and 1, so length 5 no longer equals the largest count 2 times three distinct characters.
The answer remains 4.
For `"aaaa"`, there is one distinct character throughout, so every prefix is balanced and the full length 4 is returned.

## Complexity
There are O(n) starts and at most O(n) extensions for each, giving O(n^2) time.
The frequency map or 26-entry array uses O(a) space, where a is the alphabet size, aside from the input.

## Edge cases
A one-character substring is balanced.
A substring containing one distinct character is always balanced.
The empty string is outside the stated input range.

## Common mistakes
Equal total length alone does not prove balance; compare it with the largest frequency times the distinct count.
Do not require all alphabet letters to appear.
Reset counts for each new start.

## Language notes
Python uses a dictionary because it directly tracks characters that appear.
Java uses a 26-entry count array because the input alphabet is lowercase English letters.
