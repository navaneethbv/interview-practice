## Intuition

For any window, keeping its most frequent letter minimizes the required replacements.
The replacement count is the window length minus that maximum frequency.
A sliding window can track a historical maximum frequency `peak` to find the best length without repeatedly scanning all letter counts.

## Brute force

For every substring start, extend its end while counting letters and checking replacement cost.
This takes O(n²) time with a fixed alphabet.
The sliding-window method advances each boundary at most n times.

## Approach

1. Maintain character `counts`, a left boundary, and `peak`, the largest single-character count observed during expansion.
2. Add each rightmost character and increase `peak` if necessary.
3. While `right - left + 1 - peak > k`, remove the leftmost character and advance `left`.
4. Update `best` with the retained window length.
5. Return `best`.

The stored `peak` deliberately never decreases.
After it becomes stale, the algorithm may retain an invalid current window, but that window cannot improve the best length until a sufficiently large frequency is actually observed again.
Thus the method correctly returns a length; it is not intended to return the final retained window as a witness.

## Walkthrough

Example 1 uses `s = "ABBBAC"` and `k = 1`.

| Added character | Retained window | `peak` | `best` |
| --- | --- | --- | --- |
| A | `A` | 1 | 1 |
| B | `AB` | 1 | 2 |
| B | `ABB` | 2 | 3 |
| B | `ABBB` | 3 | 4 |
| A | `BBBA` after removing initial A | 3 | 4 |
| C | `BBAC` after removing one B | 3, now stale | 4 |

The final retained window would need two replacements, but the earlier `ABBB` already proves length four is achievable with one.
Return 4.

## Complexity

- Time: O(n), since both boundaries advance monotonically and count updates are constant-time for the fixed alphabet.
- Space: O(1), with counts for at most 26 uppercase letters.

## Edge cases

With k equal to zero, the answer is the longest existing repeated-letter run.
If every character can be replaced, the entire string is feasible.
Repeated identical letters grow the window without replacement cost.

## Common mistakes

- Claiming `peak` always equals the current window's maximum makes the proof incorrect.
- Returning the final window's contents can return an invalid witness.
- Decreasing `peak` without recomputing the actual maximum can discard useful windows incorrectly.

## Language notes

Python uses a dictionary of counts; Java uses a 26-entry array indexed from `'A'`.
Both preserve the same historical-peak invariant.
The fixed uppercase-letter contract makes the Java array indexing safe.
