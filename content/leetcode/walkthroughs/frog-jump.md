## Intuition

The useful state is not only the stone position but also the jump length that landed there.
From a jump of length k, the next jump can be k-1, k, or k+1, and only positive jumps that land on known stones are retained.

## Brute force

Trying every jump sequence branches up to three ways and revisits the same position with the same speed.
Memoizing reachable jump lengths removes those repeated branches.

## Approach

1. Map every stone position to a set of reachable incoming jump lengths.
2. Start at position 0 with jump length 0.
3. For each reachable state, try the three next lengths and record valid landing states.
4. Check whether the final stone's set is nonempty.

## Walkthrough

For Example 1, the stones are `[0,1,3,5,6,8,12,17]`.
The first jump reaches 1 with length 1, then 3 with length 2.
From 3, length 2 reaches 5, and length 1 reaches 6 from 5.
One successful chain is lengths `1,2,2,3,4,5`, landing at 17, so the result is true.

## Complexity

With S stones, there are at most O(S^2) position and jump states, and each tries three lengths, so the worst-case time and state space are O(S^2).
Python uses a dictionary of sets, and Java uses a `Map<Long, Set<Integer>>` so position arithmetic does not overflow for the maximum stone value.

## Edge cases

A second stone at position 1 is required because the first jump must have length 1.
A gap larger than all reachable next jumps makes the remaining states empty.
The final stone is accepted through any reachable incoming length.

## Common mistakes

Do not store only one jump length per position.
Do not allow zero or negative next jumps.
Do not assume the stones are dense integers.

## Language notes

Python's set comprehension creates one empty state set per stone.
Java boxes jump lengths inside sets and uses `long` keys for positions.
