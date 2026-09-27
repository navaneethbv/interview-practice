## Intuition

A question mark matches one character and a star can match any sequence.
When a later mismatch appears, the most recent star can absorb one more string character.
Remembering that star and the string position it has consumed avoids a full dynamic-programming table.

## Brute force

A recursive matcher could branch whenever it sees a star, trying both empty and nonempty matches.
Repeated stars create exponential branching in the worst case.
The greedy backtracking state stores one fallback star and advances its matched length monotonically.

## Approach

1. Keep indices for the string and pattern plus the latest star position.
2. Advance both indices for an exact or question-mark match.
3. On a star, record it and tentatively match zero characters.
4. On a mismatch with a recorded star, let that star absorb one more string character and retry after it.
5. After the string ends, accept only remaining stars.

## Walkthrough

Example 1 matches adceb against *a*b.
The first star initially matches zero characters, then a matches a.
The second star initially matches zero characters, and b first mismatches d.
The star then absorbs d, c, and e as the string index advances, after which b matches the final character and the pattern ends.
The method returns true.

## Complexity

Let s and p be the string and pattern lengths.
The greedy scan uses O(s times p) worst-case time because a mismatch can retry suffix positions after the latest star.
The indices and saved star state use O(1) auxiliary space.
No table proportional to s times p is allocated.
The returned value is a boolean.

## Edge cases

An empty pattern matches only an empty string.
A pattern of only stars matches any string.
A question mark cannot match an absent character.
Consecutive stars are handled by the same latest-star state.

## Common mistakes

- Treating a star as matching exactly one character rejects valid empty matches.
- Advancing past a star without saving its position loses the fallback.
- Accepting any remaining pattern after the string ends incorrectly allows letters after stars.
- Resetting the matched string position backward can cause nontermination.

## Language notes

Python uses integer indices and character indexing.
Java uses charAt without allocating a character array.
Both references preserve the one-star greedy fallback invariant.
