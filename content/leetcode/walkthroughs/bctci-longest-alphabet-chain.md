## Intuition

A chain follows one fixed cyclic alphabet order, so every complete lap consumes one occurrence of all 26 letters.
After removing as many full laps as possible, only a consecutive arc of available letters can extend the chain.

## Brute force

Trying all permutations of chosen characters is unnecessary and grows factorially.
Character counts fully determine feasibility because original input order may be discarded.

## Approach

Count each lowercase letter and let `cycles` be the minimum count.
Reserve that many complete alphabet cycles, contributing 26 times cycles characters.
Examine which letters have counts remaining above that minimum.
Scan the 26-letter alphabet twice, tracking the longest run of positive remaining counts to allow wrapping from z to a.
At least one remaining count is zero, so this residual run cannot incorrectly include another full cycle.
Return the complete-cycle contribution plus the longest residual arc.

## Walkthrough

```text
Input: ["azbc"]
Output: 4
```

Example 1 contains a, z, b, and c once each.
Many letters are absent, so cycles is zero.
The doubled alphabet scan recognizes the wraparound run z, a, b, c, whose length is four.
Reordering the input into `zabc` uses every occurrence and obeys the next-letter rule, so the answer is 4.

## Complexity

Counting takes O(n) time, and the doubled alphabet scan has fixed length 52.
The total is O(n) time and O(1) extra space for 26 counts and a few counters.

## Edge cases

Empty input returns zero.
Several copies of one isolated letter cannot form a longer chain without intervening alphabet letters.
Equal counts for every letter produce only complete cycles.

## Common mistakes

Do not treat this as a subsequence problem; reordering is allowed.
Scanning the alphabet only once misses chains crossing z to a.

## Language notes

Python subtracts cycles from its count array.
Java leaves counts unchanged and tests whether each count exceeds cycles, an equivalent residual-availability check.
