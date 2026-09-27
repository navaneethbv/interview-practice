## Intuition

After sorting citations from largest to smallest, position rank asks whether at least rank papers have rank citations.
The greatest passing rank is the h-index.

## Brute force

Testing every possible h and counting qualifying papers costs O(n squared).
Sorting once makes the qualifying count implicit in the index.

## Approach

1. Sort citation counts in descending order.
2. Enumerate one-based ranks.
3. Keep a rank whenever its citation count reaches that rank.

## Walkthrough

Example 1:

For [4,0,5,2,3], descending order is [5,4,3,2,0].
The first three positions meet counts 1, 2, and 3.
The fourth position has only 2 citations, so the answer is 3.

## Complexity

Sorting takes O(n log n) time and O(n) auxiliary space in Python because sorted creates a new list.
The Python scan then uses O(1) additional space.
Java sorts the input primitive array in place and scans it in O(n) time.

## Edge cases

All zero citations produce zero.
Every paper cited at least n times produces n.
The h-index is bounded by the number of papers, not the largest citation count.

## Common mistakes

Do not compare a citation count with a zero-based index.
Do not return the first passing rank if a larger rank also passes.
Sort in descending order or adjust the index condition for ascending order.

## Language notes

Python uses sorted with reverse order and does not mutate citations.
Java uses Arrays.sort on the input and examines the ascending array from its lowest qualifying suffix.
Both scans return the largest rank supported by the citation counts.
