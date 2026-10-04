## Intuition

Flooded counts increase over time, so the closest photo to half flooded lies at the crossing of that midpoint.
Within each row, the boundary between ones and zeros can also be found by binary search.

## Brute force

Counting every cell in every photo takes O(Pn squared) time for P pictures of side n.
Both monotonicities reduce the amount of image data that must be inspected.

## Approach

`_ones` finds the first zero in a row and returns its index, which equals that row's flooded count.
Sum those counts to obtain `_flooded` for a photo.
Binary-search pictures for the first whose doubled flooded count reaches n squared, or the final picture when none reaches it.
Compare that candidate with its immediate predecessor using absolute imbalance `abs(2 * flooded - total)`.
Prefer the earlier index on equal imbalance.
Strictly increasing flooded counts ensure no more distant photo can improve on these candidates.

## Walkthrough

```text
Input: pictures = [["000", "000", "000"], ["100", "000", "100"], ["110", "000", "100"], ["110", "111", "100"], ["111", "111", "110"]]
Output: 2
Explanation: Pictures 2 and 3 are equally close to half flooded; 2 is earlier.
```

Example 1 has nine cells per picture and flooded counts 0, 2, 3, 6, and 8.
The midpoint crossing is picture 3, with six flooded cells.
Its imbalance is abs(12 - 9) = 3.
Picture 2 has imbalance abs(6 - 9) = 3 as well.
The earlier-picture tie rule therefore returns index 2.

## Complexity

One flooded count costs O(n log(n + 1)).
The outer search and final comparisons give O(n log(n + 1) log(P + 1)) time.
The iterative searches use O(1) extra space beyond input.

## Edge cases

A single picture returns index zero.
If all pictures are below half, the final one is closest.
If all are above half, the first is closest.

## Common mistakes

Do not assume counts change by exactly one between pictures.
Use a non-strict comparison when selecting the earlier tied candidate.

## Language notes

Python uses integer arithmetic throughout.
Java uses long for doubled counts and total-area comparisons, while row and picture indices remain ints.
