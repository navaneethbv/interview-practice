## Intuition

The search chooses increasing digits from 1 through 9, so every combination is generated once.
A partial path carries both how many slots remain and how much sum remains.

## Brute force

Enumerating all subsets of the nine digits and filtering by size and sum is 2^9 work.
Backtracking prunes a branch as soon as its next digit exceeds the remaining sum.

## Approach

1. Start at digit 1 with an empty path.
2. Try each later digit, append it, and recurse with one fewer slot.
3. Record a copy only when exactly k digits have remaining sum zero.
4. Pop the digit before trying the next candidate.

## Walkthrough

For Example 1, k=3 and n=7.
The branch `[1,2]` has remaining sum 4, so choosing 4 records `[1,2,4]`.
Choosing a larger third digit would exceed 7, and every branch beginning with 2 needs two distinct later digits whose sum is only 5, which cannot beat the minimum 3+4.
The result is `[[1,2,4]]`.

## Complexity

The digit universe is fixed at nine values, so the search is bounded by O(2^9) nodes and output copying.
With K returned combinations, output storage is O(9K), and the recursion path uses O(9) space.
Python copies paths at leaves; Java copies its `ArrayList` at leaves.

## Edge cases

A sum below the minimum possible k-digit sum returns no combinations.
A sum above the maximum 1 through 9 selection also returns none.
Digits are distinct because recursion always advances the start.

## Common mistakes

Do not reuse the same digit.
Record only exact k-length paths.
Copy the path before backtracking.

## Language notes

Python's `_visit` mutates one list and restores it.
Java's `visit` follows the same push and pop discipline.
