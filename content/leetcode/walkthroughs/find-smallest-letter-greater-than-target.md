## Intuition
The sorted order separates letters that are at most the target from letters that are strictly greater.
The answer is the first position in the second region.
An empty second region means the search reaches the end, which is precisely the wraparound case.

## Brute force
Scan from left to right until a greater letter appears, otherwise return the first letter.
This takes O(n) time and O(1) auxiliary space.
Binary search uses the same ordering rule while discarding half the remaining candidates each iteration.

## Approach
1. Search for the upper bound of `target`, meaning the first letter strictly greater than it.
2. In Java, keep a half-open search interval from `left` to `right`.
3. If the middle letter is at most the target, advance `left` past it; otherwise move `right` to the middle.
4. When the bounds meet, use that index modulo the array length to handle wraparound.

Every index before `left` has already been ruled out.
The answer remains at or before `right`, including the sentinel position just beyond the array.

## Walkthrough
Example 1 has letters `[c,f,j]` and target `f`.
Initially Java has `left = 0` and `right = 3`.
The middle index is 1, whose letter equals the target, so `left` becomes 2.
The next middle index is 2, whose letter `j` is greater, so `right` becomes 2.
The bounds meet at index 2 and the result is `j`.
Python's `bisect_right` returns the same upper-bound index.

## Complexity
Time is O(log n), because each comparison halves the search interval.
Auxiliary space is O(1); neither reference copies the letters or recurses.
The result is one character.

## Edge cases
A target below the first letter returns that first letter.
A target at least as large as the final letter wraps to index zero.
Repeated target letters must all be skipped because the comparison is strict.

## Common mistakes
- Using a lower bound can return a letter equal to the target.
- Indexing the sentinel position without wrapping goes out of bounds.
- Moving the upper bound past a greater middle letter can discard the answer.

## Language notes
Python uses the standard `bisect_right` operation.
Java compares primitive `char` values and computes the midpoint without adding both bounds directly.
