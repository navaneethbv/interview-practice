## Intuition
A valid mountain has exactly one transition from strict ascent to strict descent.
Walking upward until ascent stops identifies the only possible peak.
If descending from there consumes the rest of the array, the required shape exists.

## Brute force
Try every interior index as the peak and scan both sides to verify their ordering.
Up to n candidate peaks each require O(n) comparisons, for O(n^2) time.
A single forward index avoids revisiting prefixes that were already classified.

## Approach
1. Begin at index zero and advance while the next value is strictly larger.
2. Reject if the ascent ends at the first or final index.
3. Continue advancing while the next value is strictly smaller.
4. Accept only if this descent ends at the final element.

The first rejection guarantees that both slopes contain at least one step.
The final position check rejects plateaus and any second ascent after the peak.
No separate peak-value variable is necessary because the index itself records the boundary between the two phases.

## Walkthrough
Example 1 is `[1,4,2]`.
Starting at index 0, the comparison `1 < 4` advances `index` to 1.
The next comparison `4 < 2` fails, so index 1 is the candidate peak.
It is an interior index, satisfying the requirement for an ascent and a possible descent.
The descending comparison `4 > 2` advances to index 2.
That is the final index, so the method returns true.

## Complexity
The index moves only forward and advances at most n minus one times, giving O(n) time.
Only an index and loop-condition values are retained, so auxiliary space is O(1).
Neither reference changes or copies the input array.

## Edge cases
Inputs shorter than three elements cannot contain an interior peak with both slopes.
An entirely increasing array stops at the last index and is rejected.
An entirely decreasing array never completes an ascent and is rejected.
Equal neighboring values stop both strict comparisons, so a plateau is invalid.

## Common mistakes
- Allowing non-strict comparisons accepts flat sections.
- Accepting a peak at either endpoint permits a missing slope.
- Returning true immediately after one decreasing step ignores later violations.

## Language notes
Python and Java use the same index-based two-phase scan.
Both check that the next index exists before reading that element, relying on short-circuit evaluation to prevent an out-of-bounds access.
