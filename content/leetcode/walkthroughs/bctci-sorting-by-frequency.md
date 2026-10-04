## Intuition

Only each letter's total count matters after scanning the word.
Sort the distinct observed letters by descending count, using alphabetical order when counts match.
The alphabet is small, so the sorting phase is bounded independently of word length.

## Brute force

For every letter occurrence, recount its frequency by scanning the word, then attempt to order those repeated occurrences.
This repeats work and also risks returning duplicate letters when the contract requests each distinct letter once.

## Approach

Count all letters first.
Python's `Counter` maps each observed letter to its frequency, then sorts the keys by the pair of negative frequency and letter.
The negative count places larger frequencies first, and the letter itself resolves ties alphabetically.
Java counts into a 26-entry array, then creates a list of observed letters in alphabetical order.
Its stable list sort compares only descending frequency, so equal-frequency entries retain that original alphabetical order.
Return the resulting distinct-letter sequence, without repeating a letter according to its count.

## Walkthrough

Example 1 is `aabbbcccc`.
The counts are a equal to two, b equal to three, and c equal to four.
Sorting by decreasing count places c first, then b, then a.
The result is `["c", "b", "a"]`.
It contains three entries rather than nine because frequency determines ordering, not how many output copies to include.

## Complexity

For n characters and u observed letters, counting plus sorting takes O(n + u log u) time, with u at most 26.
Python uses O(u) counting and output space.
Java's fixed counter and result are bounded by 26, but `word.toCharArray()` temporarily allocates O(n) space in the displayed reference.

## Edge cases

Empty input produces an empty list.
When every count ties, the answer is the distinct letters in alphabetical order.
One repeated letter still produces only one output entry.

## Common mistakes

Specify a tie rule explicitly or preserve alphabetical input order with a stable sort.
Do not sort all original occurrences as the final result.

## Language notes

Python expresses both ordering criteria in one tuple key.
Java relies on stable list sorting; its frequency subtraction is safe because counts are bounded by 100,000.
