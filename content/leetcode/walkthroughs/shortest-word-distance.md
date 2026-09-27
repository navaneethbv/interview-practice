## Intuition

The closest pair must include the latest occurrence of each target word seen so far.
A single scan updates those positions and compares them whenever both exist.

## Brute force

Collecting all positions for both words and comparing every pair can take O(n squared).
Only the latest position of each word is needed for the next possible minimum.

## Approach

1. Track latest indices for word1 and word2.
2. Update the matching index at each word.
3. Update the answer when both indices are known.

## Walkthrough

Example 1:

For [red,blue,green,red] with red and green, green occurs at index 2.
The next red occurs at index 3, giving distance 1.
No later pair improves it, so the answer is 1.

## Complexity

The scan takes O(n) time.
Only two indices and the best distance are stored, so auxiliary space is O(1).
Python and Java both compare words without copying the dictionary.

## Edge cases

The target words are guaranteed to occur under the standard problem contract.
Repeated occurrences keep the latest index for future pairs.
The result is an integer distance between positions.

## Common mistakes

Do not stop after the first pair.
Update an index before calculating the distance at that position.
Do not sort the word list because positions define distance.

## Language notes

Python uses string equality directly.
Java uses String.equals for each dictionary entry.
The latest matching positions are sufficient because earlier positions can only be farther away.
The answer is updated immediately when the second target word appears.
