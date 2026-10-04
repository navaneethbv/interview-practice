## Intuition

Identical copies are indistinguishable in a submultiset.
Choose how many copies of each distinct value to include, rather than choosing individual array indices.
That directly generates each distinct submultiset once.

## Brute force

Enumerating every index subset and deduplicating afterward creates many repeated candidates when values repeat.
Grouping first avoids those duplicates during generation.

## Approach

Build `groups` containing each value and its available copy count.
The recursive `count(index, total)` chooses from zero through all available copies of the current value.
For each choice, recurse to the next group with `total + taken * value`.
After all groups are processed, contribute one exactly when the total is zero.
Different choice vectors describe different multiplicities, so no additional set of completed answers is needed.
The all-zero choice vector includes the empty submultiset automatically.

## Walkthrough

```text
Input: S = [1, 1, -1, -1]
Output: 3
```

Example 1 has groups `(1, 2)` and `(-1, 2)`.
The positive and negative multiplicities can each be 0, 1, or 2.
Their sum is zero exactly when those multiplicities match.
The valid choices are `(0, 0)`, `(1, 1)`, and `(2, 2)`.
Thus the empty multiset, one of each sign, and two of each sign give answer 3.

## Complexity

With group counts c1 through cd, the search has product `(ci + 1)` leaves and proportional total traversal work.
This is at most O(2 to the power n).
Grouping and recursion use O(n) space; Java's TreeMap construction additionally costs O(n log d) time.

## Edge cases

An empty input has one zero-sum submultiset.
A zero value with c copies gives c + 1 distinct multiplicity choices.
Negative totals cannot be pruned safely when positive values remain.

## Common mistakes

Do not multiply by combinations of identical-copy indices.
Do not discard the empty choice.

## Language notes

Python uses Counter insertion order; Java sorts groups with TreeMap.
Group order changes traversal order but not the count.
