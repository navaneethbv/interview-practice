## Intuition
With one term missing from an arithmetic progression, the common difference is recoverable from the endpoint gap divided by the number of observed gaps.
Comparing each observed value with its expected position reveals the missing term.

## Brute force
Checking every adjacent difference can find the break, but still needs a special case for a missing endpoint.
Expected-position comparison handles every location uniformly.

## Approach
1. Compute `difference = (last - first) / len(arr)` because the full progression has one extra gap.
2. For each index, compute `first + index*difference`.
3. Return the first expected value that differs from the observed value.
4. If no difference appears, return the first term as the contract's fallback.

## Walkthrough
Example 1 is `[5,7,11,13]`.
The endpoint gap is 8 and there are four observed terms, so the difference is 2.
Expected values are 5, 7, 9, and 11 at the observed positions; the third observed value is 11 instead of 9.
The missing number is 9.

## Complexity
The scan takes O(N) time and uses O(1) auxiliary space.
No sorted copy is made because the statement supplies an arithmetic progression order.

## Edge cases
Example 2 `[15,13,12]` has negative difference one and returns 14 at index 1.
The missing value can be before the first observed value or after the last under the local contract.
The progression may be descending.

## Common mistakes
Dividing the endpoint gap by `len(arr)-1` forgets the missing term and produces the wrong difference.
Assuming a positive difference fails for descending progressions.
Only checking adjacent gaps misses a missing endpoint.

## Language notes
Python and Java use integer division because the contract guarantees an integral common difference.
Both references retain the original array and compare expected positions directly.
