## Intuition

After sorting, any numeric interval contains a consecutive block of array occurrences.
An optimal range can tighten its endpoints to the smallest and largest of some k consecutive occurrences.
Thus only fixed-size sorted windows need to be compared.

## Brute force

Try every pair of endpoint values and count how many elements lie between them.
That repeats interval counting and can take cubic time without additional preprocessing.

## Approach

Sort a copy of arr into `ordered`.
For each start with k entries remaining, form endpoints `ordered[start]` and `ordered[start + k - 1]`.
Compare their width with the best range so far and replace best only when the width is strictly smaller.
Since starts are visited in sorted order, tied widths naturally keep the smallest low endpoint.
An interval containing more than k values does not require a separate case: selecting any k consecutive members gives a range no wider, so an optimum is represented by these candidates.
Duplicates count as separate elements within a window.

## Walkthrough

Example 1 is already sorted as `[1, 2, 5, 7, 8]`, with k equal to three.
The candidate ranges are `[1, 5]` of width four, `[2, 7]` of width five, and `[5, 8]` of width three.
The final candidate improves the best width and is returned.
The answer `[5, 8]` contains exactly the values 5, 7, and 8.

## Complexity

Sorting n values takes O(n log n), followed by an O(n) window scan.
Both references allocate an O(n) sorted copy.
Each candidate and the returned endpoint pair require only constant additional storage.

## Edge cases

For k equal to one, every width is zero and the smallest array value wins.
Repeated equal values can provide a zero-width range containing several occurrences.

## Common mistakes

Do not deduplicate input values, because the requirement counts elements rather than distinct values.
Avoid replacing best on equal width unless the tie rule is handled explicitly.

## Language notes

Python uses ordinary integer subtraction.
Java casts endpoints to `long` before computing widths, ensuring comparisons remain safe for wide signed-value ranges.
