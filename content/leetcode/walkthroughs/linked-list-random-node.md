## Intuition

Reservoir sampling picks a uniform element from a sequence of unknown length in one pass: keep the k-th element with probability 1/k. The first element is kept for sure, then each later element replaces it with just the right probability so that every element ends up chosen with probability 1/n.

## Approach

1. Walk the list, counting nodes seen.
2. At the k-th node, replace the current choice with probability 1/k.
3. Return the choice after the walk.

## Walkthrough

For [1, 2, 3]: 1 is chosen first. 2 replaces it with probability 1/2, and 3 replaces the choice with probability 1/3. Each value ends up with probability 1/3.

## Complexity

- Time: O(n) per call.
- Space: O(1).

## Edge cases

- A single node is always chosen.
- Duplicate values are chosen in proportion to how often they appear.

## Common mistakes

- Copying the list into an array is simpler but uses O(n) memory; mention it as the trade-off.
- Using probability 1/n with the final n before it is known.
