## Intuition

This is reservoir sampling restricted to the matching indices: the k-th match replaces the current choice with probability 1/k, which leaves every match equally likely.

## Approach

1. Scan the array.
2. Count matches; at the k-th match, keep its index with probability 1/k.
3. Return the kept index.

## Walkthrough

For target 3 in [1, 2, 3, 3, 3], index 2 is kept first, index 3 replaces it with probability 1/2 and index 4 with probability 1/3, so each is chosen with probability 1/3.

## Complexity

- Time: O(n) per pick.
- Space: O(1).

## Edge cases

- A target that occurs once always returns its single index.

## Common mistakes

- Returning the first match every time.
- Building a map from value to indices is O(1) per pick but O(n) memory; state which you chose and why.
