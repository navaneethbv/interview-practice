## Intuition

An isomorphism is a one-to-one character mapping.
Every source character must always produce the same target character.
Two different source characters cannot produce the same target character.
Keeping maps in both directions checks both rules as the strings are scanned.

## Brute force

A brute-force method could try every possible target assignment for each distinct source character.
With C possible characters, that creates up to C factorial mappings before checking the strings.
Most mappings fail only after repeated work on earlier positions.
The two maps validate each pair as soon as it can contradict a mapping.

## Approach

1. For each aligned source and target character, check source_to_target if the source was seen.
2. Reject the pair if its recorded target differs.
3. Check target_to_source for the reverse conflict.
4. Record both directions after the checks pass.
5. The equal-length constraint means zip or the indexed Java loop visits every character pair.

## Walkthrough

For Example 1, source paper and target title first map p to t.
The next pair maps a to i.
The next pair maps p to t again, which agrees with the existing mapping.
The remaining pairs map e to l and r to e, so the result is true.
For Example 2, a maps to a at the first position.
The next source character b would also need to map to a, and the reverse map rejects that collision.

## Complexity

The scan takes O(n) time for n characters.
The two maps use O(u) space for the distinct characters encountered.
Dictionary and hash-map operations are expected O(1) per character.

## Edge cases

One-character strings are always isomorphic.
Repeated source characters must repeat their original target mapping.
Repeated target characters cannot be assigned to different source characters.
Spaces and digits are ordinary ASCII characters and are mapped like letters.

## Common mistakes

Do not keep only the source-to-target map, because that accepts collisions such as ab and aa.
Do not compare only the set of distinct characters, because positions and repeated mappings matter.
Do not use character frequency alone, because equal frequencies do not define a positional mapping.

## Language notes

Python uses two dictionaries and a zip over the aligned strings.
Java uses two HashMaps keyed by Character and checks the indexed pairs.
The public method remains isIsomorphic in both references.
