## Intuition

The smallest unconsumed value across two sorted arrays must be at one of their current heads.
Taking that smaller head repeatedly constructs a sorted output while preserving every occurrence, including duplicates.

## Brute force

Concatenating and sorting all values costs O((n + m) log(n + m)) time.
The reference uses the existing input order to merge with one forward scan and no repeated comparisons against consumed elements.

## Approach

Initialize `i` and `j` to zero.
While both arrays have remaining elements, append the smaller current value and advance only its index.
On equality, take from `arr1`.
When one array ends, append the entire remaining suffix of the other.

## Walkthrough

Example 1 chooses 1 from the first array, then 2 from the second, then 3 from the first.
At equal 4 values it first takes the first array's 4, then both remaining 4 values from the second.
Appending 5 finishes `[1, 2, 3, 4, 4, 4, 5]`.

## Complexity

Each of n + m elements is written once, so time is O(n + m).
The output requires O(n + m) space.
Java uses only constant additional indexing space; Python's suffix slices can require O(n + m) temporary space in the worst case.

## Edge cases

Either input may be empty, in which case the other is copied directly.
Both empty inputs return an empty result.
Duplicate and negative values are preserved exactly, and the output length must equal the sum of input lengths.

## Common mistakes

Do not discard equal values as though computing a set union.
Do not advance both indices after appending only one element.
The suffix append is essential because the main comparison loop stops as soon as either input runs out.

## Language notes

Python builds `merged` dynamically and extends it with slices.
Java allocates the final array once and tracks output position `k`.
Both leave the source arrays unchanged and return a distinct merged array.
