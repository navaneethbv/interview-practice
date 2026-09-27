## Intuition

After sorting, if a larger value is divisible by a smaller value, it can extend a compatible chain.
For each index, store the longest divisible subset ending there and its predecessor.
Following predecessors reconstructs one valid maximum subset.

## Brute force

A subset generator could inspect every subset and test all pairs for divisibility.
That takes exponential time in the number of values.
Dynamic programming considers only earlier sorted endpoints and reuses their best chains.

## Approach

1. Sort nums in ascending order.
2. Initialize each value's chain length to one and predecessor to none.
3. For each current value, test earlier values that divide it.
4. Record the longest predecessor chain and the best ending index.
5. Follow predecessor links from that index to build the result.

## Walkthrough

Example 1 sorts [1,2,3].
Value 1 starts a chain of length 1.
Value 2 extends 1 because 2 is divisible by 1.
Value 3 also has a valid chain from 1 but does not exceed the current best length.
The method returns [2,1], which is a valid largest subset of size 2.

## Complexity

For n values, the nested dynamic-programming loops take O(n squared) time.
Sorting adds O(n log n) time.
The length and predecessor arrays use O(n) auxiliary space, and the returned subset uses O(n) output space.
The input is sorted in place by both references.

## Edge cases

A one-value input returns that value.
Several maximum subsets may exist, so any valid one is acceptable under the local comparison.
Value 1 can divide every positive value.
The statement's positive-value contract makes modulo checks valid.

## Common mistakes

- Sorting descending breaks the earlier-divisor recurrence.
- Requiring every pair in the whole input to divide each other rejects valid chain subsets.
- Forgetting predecessors loses the actual subset.
- Returning the best length instead of values violates the output contract.

## Language notes

Python follows predecessor indices in a list.
Java uses parallel int arrays and returns values in reverse chain order.
Both preserve one valid maximum subset rather than imposing a unique ordering.
