## Intuition

Each gap between consecutive landing points normally contributes aging equal to its size.
A jump can eliminate the aging for one gap, so the best use of `k` jumps is to remove the `k` largest gaps.
The minimum possible aging is therefore the sum of all gaps after those largest gaps are discarded.

## Approach

Compute every consecutive gap in `points`.
Sort the gaps from largest to smallest in Python, or ascending in Java.
Skip the first `k` largest gaps and sum the rest.
Return whether that minimum aging is at most `maxAging`.

## Walkthrough

For Example 1, the only gap is four years and no jumps are available, so all four years count as aging.
Because four exceeds `maxAging = 3`, the method returns false.
For Example 2, the gaps are `[58, 2, 2, 55, 9, 12, 23, 37, 20]`.
Using four jumps removes the four largest gaps, leaving an aging total of forty five or less, so the result is true.

## Complexity

With `n` landing points, gap construction takes `O(n)` time and sorting takes `O(n log n)` time.
The gap array uses `O(n)` auxiliary space.
Java accumulates the answer in a `long` because a valid year difference can exceed the signed 32-bit range when summed.

## Edge cases

When `k` equals the number of gaps, every gap is jumped and the remaining aging is zero.
With zero jumps, the method sums every consecutive gap, which telescopes to the full time span.
Large year values require subtracting in a widened type before adding gaps.

## Common mistakes

Removing arbitrary gaps instead of the largest ones can leave more aging than necessary.
Sorting ascending and skipping the first `k` values removes the smallest gaps and reverses the intended optimization.
Comparing against `maxAging` before all retained gaps are summed can produce a premature result.

## Language notes

Python creates a reverse-sorted list and sums the slice beginning at `k`.
Java sorts ascending and sums the first `gaps.length - k` entries, which is the same retained set.
Both references keep the original sorted landing-point order while choosing jumps by gap size.
