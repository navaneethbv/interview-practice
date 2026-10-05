## Intuition

A valid window must satisfy letter multiplicities, not merely contain distinct required letters.
Track remaining deficits for each required letter.
Once all deficits are satisfied, shrinking the window finds the shortest valid ending at the current right boundary.

## Brute force

Try every substring and count its letters to test whether it covers s2.
Even with incremental counts for each start, this requires O(n²) candidate windows.

## Approach

Build `need` from s2 and initialize `missing` to the number of distinct required letters.
When adding a required letter, decrement its deficit; a transition to zero satisfies that letter and decrements missing.
Negative deficits represent surplus occurrences.
While missing is zero, update best and remove the leftmost character.
If removing a required character changes its deficit to one, that letter becomes unsatisfied and shrinking stops.
The loop considers every minimal valid window endpoint without moving either pointer backward.

## Walkthrough

Example 1 uses `s1 = "helloworld"` and `s2 = "well"`.
The required counts are w:1, e:1, and l:2.
At index 5, the prefix `hellow` first satisfies them all.
Removing the unnecessary h leaves `ellow`, of length five.
Removing e would make e deficient, so the valid shrinking phase ends.
No later window can replace that sole e with another occurrence.
The minimum returned length is 5.

## Complexity

For lengths n and m, counting and pointer scans take O(n + m) time.
The lowercase alphabet bounds count storage by 26, giving O(1) auxiliary space.

## Edge cases

If a required letter or multiplicity never appears, best remains unset and the result is -1.
Extra copies of required letters can be removed while their deficits remain nonpositive.

## Common mistakes

Do not decrement missing for every occurrence of a required character.
Only crossings between deficient and satisfied status change it.

## Language notes

Python uses a dictionary containing only required letters.
Java uses `need[26]` plus a `required` mask so unrelated letters do not alter deficit tracking.
