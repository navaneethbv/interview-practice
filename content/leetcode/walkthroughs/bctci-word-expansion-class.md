## Intuition

Reordering does not matter when comparing two words, so only their letter counts matter.
The target must have exactly one more character and must contain every count from the original word.

## Brute force

Generating every permutation after adding each possible letter would be factorial in the word length.
Sorting both strings would work but costs O(n log n) and hides the fixed alphabet structure.

## Approach

The constructor records the length and a frequency table for s.
For expands_into, reject immediately unless s2 has length length plus one.
Count every character in s2.
If any target count is smaller than the stored count, s2 removed a required character.
The length check then guarantees that the remaining extra count is exactly one.

## Walkthrough

In Example 1, tea has one t, one e, and one a.
The target team has those three counts plus one m, so it is a valid expansion.
The target seam has length four but lacks t and introduces both s and m, so at least one original letter would need to be replaced.
The method returns true only for the target whose multiset is the original multiset plus one letter.

## Complexity

Counting s2 takes O(m) time for target length m.
Java checks a fixed 26-letter table after counting, while Python checks the keys present in its counters.
The stored and temporary tables use O(26) space for Java and O(d) space for Python, where d is the number of distinct letters.

## Edge cases

An empty original word expands into any one-letter word.
A target with the same length is rejected even if it has the same letters.
Repeated letters are compared by count, so aab requires both copies of a.
All inputs use lowercase English letters, making the Java array index safe.

## Common mistakes

Comparing sets loses multiplicity and incorrectly accepts missing repeated letters.
Checking only that every original letter appears ignores extra replacements.
Allowing a target longer by more than one violates the exact expansion rule.

## Language notes

Python uses Counter and subtract, then confirms no resulting count is negative.
Java uses a 26-element difference table and relies on the length check to establish one extra letter.
The Java method name expandsInto follows the spec's camelCase mapping.
