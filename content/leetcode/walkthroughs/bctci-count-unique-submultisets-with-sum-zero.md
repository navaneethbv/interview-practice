## Intuition

Equal input values are indistinguishable in a submultiset.
Instead of choosing individual occurrences, choose how many copies of each distinct value to take, which represents every possible submultiset exactly once.

## Brute force

Enumerating subsets of positions counts identical multisets multiple times when values repeat.
One could deduplicate those subsets afterward, but grouping equal values before recursion avoids producing the duplicates in the first place.

## Approach

Build `groups` containing each value and its available `copies`.
The recursive `count(index, total)` tries `taken` from zero through that multiplicity and adds `taken * value` to the running sum.
After all groups, contribute one exactly when `total == 0`.

## Walkthrough

Example 1 groups the input into two copies of 1 and two copies of -1.
The first group offers counts 0, 1, or 2, as does the second.
Only count pairs `(0, 0)`, `(1, 1)`, and `(2, 2)` sum to zero, giving 3.

## Complexity

Let d be the distinct value count and P the product of all `(copies + 1)` factors.
The recursion has O(P) nodes up to a constant factor, since every group has at least two choices.
Time is O(n + P) in Python and O(n log(d + 1) + P) in Java; space is O(d).

## Edge cases

The empty multiset counts once because its sum is zero.
If all entries are zero, every allowed multiplicity is distinct and valid.
Positive and negative values may cancel, so a positive partial total does not justify pruning.

## Common mistakes

Do not branch separately for identical occurrences.
Do not omit the zero copy choice or the empty selection.
The goal counts multisets, not permutations, so group order must not multiply the number of answers.

## Language notes

Python uses `Counter` and iterates its groups in insertion order.
Java uses `TreeMap`, then parallel `values` and `copies` arrays.
Ordering differs but the count is unchanged; Java carries the running total in `long`.
