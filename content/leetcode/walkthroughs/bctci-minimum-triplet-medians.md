## Intuition

Each median needs one smaller companion and one larger companion.
To make medians cheap, reserve the largest third of the values as the larger companions and pair the remaining values in ascending order.
Within each pair, the second value becomes a median and the first supplies its required smaller companion.

## Brute force

Enumerate partitions into triplets, calculate every median sum, and choose the smallest.
The number of possible partitions grows combinatorially, and many differ only in which large companion accompanies a median.

## Approach

Sort the array into `ordered` and let `groups` be one third of its length.
Sum entries at indices 1, 3, 5, and so on through `2 * groups - 1`.
These positions are optimal because the first j medians collectively require at least j smaller companions, forcing the jth median to be at least the element at index `2 * j - 1`.
The construction reaches every one of those lower bounds simultaneously.
Pair adjacent values among the smallest two thirds, and attach one distinct value from the largest third to each pair.
Only the sum is required, so the references need not explicitly construct triplets.

## Walkthrough

Example 1 sorts `[6, 5, 8, 2, 1, 9]` into `[1, 2, 5, 6, 8, 9]`.
There are two groups, so the chosen medians are at indices 1 and 3: values 2 and 6.
Triplets `[1, 2, 8]` and `[5, 6, 9]` demonstrate that both choices can be realized.
Their median sum is 8.

## Complexity

Sorting n values costs O(n log n), followed by O(n) summation.
Both references make an O(n) copy, so auxiliary space is O(n), regardless of the sorting routine's internal workspace.

## Edge cases

With three values, the answer is simply the middle sorted value.
The contract guarantees distinct values and a length divisible by three.

## Common mistakes

Grouping consecutive sorted triples wastes small values as large companions.
Summing the first third does not ensure enough smaller companions for each proposed median.

## Language notes

Python sums a generator over the selected indices.
Java uses a `long` accumulator because many large medians can overflow an `int`.
