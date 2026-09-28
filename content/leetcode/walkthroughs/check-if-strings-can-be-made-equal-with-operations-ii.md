## Intuition
Swapping positions with even distance preserves index parity.
Therefore the multiset of letters at even positions and the multiset at odd positions must match between the two strings.
Those two conditions are also sufficient because arbitrary swaps within each parity class are allowed.

## Brute force
Trying sequences of swaps explores an enormous state space.
Counting letters by parity summarizes every reachable arrangement.

## Approach
1. Create a 2 by 26 frequency table for each string.
2. Add each character to the row for its index parity.
3. Compare both tables.
4. Return true only when every parity-letter count matches.

## Walkthrough
For Example 1, `abcd` has even-position letters `a,c` and odd-position letters `b,d`.
`cdab` has even-position letters `c,a` and odd-position letters `d,b`, so both parity multisets match and the result is true.
In `abdc`, the odd-position multiset changes from `{b,d}` to `{b,c}`, so the result is false.

## Complexity
The tables take O(n + A) time to build and compare, where A is the alphabet size.
The two fixed 2 by A tables use O(A) auxiliary space.

## Edge cases
Strings of length one compare their sole parity class.
Characters may repeat and are counted with multiplicity.

The operation can reorder any positions within one parity class through repeated swaps, so frequency equality is sufficient as well as necessary.

## Common mistakes
Compare parity classes separately.
Do not compare only total character counts.
Index parity is based on zero-based positions.

## Language notes
Python builds nested count lists.
Java builds two integer matrices and compares every cell.
