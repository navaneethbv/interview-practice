## Intuition
The answer is determined by the moment a second occurrence is encountered, not by the character's total frequency.
A set of previously seen characters lets the left-to-right scan detect that moment immediately.
The first repeated character returned is therefore the earliest second occurrence.

## Brute force
For each position, scan all earlier characters to see whether the current character appeared before.
This takes O(N squared) comparisons.
A set records that history in expected constant time per character.

## Approach
1. Create an empty set of seen characters.
2. Scan `s` from left to right.
3. If the current character is already in the set, return it.
4. Otherwise add it and continue.

## Walkthrough
Example 1 is `"abcbad"`.
The scan adds `a`, then `b`, then `c` to the set.
The next character is `b`, which is already present, so it is returned immediately.
The later second `a` does not matter because the second `b` was encountered first.

## Complexity
The scan performs O(N) expected-time set operations.
The set contains at most one entry per distinct lowercase letter, so its space is O(1) under the alphabet constraint.

## Edge cases
The repeated character may occur at the first two positions, as in `"zz"`.
Characters that appear many times still return on their second occurrence.
The statement guarantees a repeat, so the references have no normal fallthrough result.

## Common mistakes
Returning the most frequent character answers a different question.
Sorting the string destroys the encounter order.
Checking only neighboring characters misses nonadjacent repetitions.

## Language notes
Python uses a set of one-character strings.
Java uses a fixed boolean array indexed by `c - 'a'`, which is constant space and avoids boxing.
The Java reference throws only as a defensive unreachable fallback because the input guarantees a repetition.
