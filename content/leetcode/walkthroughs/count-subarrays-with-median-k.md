## Intuition
Because all values are distinct and k is present, every qualifying subarray contains k.
Replace values greater than k with +1 and smaller values with -1.
For a left and right balance around k, the even-length median rule is satisfied when their combined balance is 0 or 1.

## Brute force
Enumerating each subarray and sorting it costs O(N squared log N) or more.
The balance condition avoids sorting and matches every qualifying boundary pair in linear expected time.

## Approach
1. Locate k and count balance frequencies while walking left from the pivot.
2. Include the pivot with initial balance zero.
3. Walk right from the pivot, updating the balance.
4. Add left frequencies for balances `-rightBalance` and `1 - rightBalance`.

## Walkthrough
Example 1 is `[3, 2, 1, 4, 5]` with k equal to 4.
The pivot is index 3, and left balances from nearest outward are -1, -2, and -3.
The singleton `[4]` uses balance zero and is counted by the initial zero balance.
Adding 5 gives right balance 1, which matches the required balance 0 or 1 with the empty left side.
Adding left value 1 and right value 5 gives combined balance 0, producing the third qualifying subarray.

## Complexity
The two directional scans take O(N) expected time.
The balance map and result bookkeeping use O(N) space.

## Edge cases
The singleton `[k]` always qualifies.
An even-length subarray uses the smaller middle value, which is why balance 1 is accepted.
Values are distinct, so no equal-to-k side values need special treatment.

## Common mistakes
Accepting only balance zero misses valid even-length subarrays.
Counting subarrays that do not contain k invalidates the transformation.
Using absolute values instead of signed balances loses side orientation.

## Language notes
Python uses `Counter` for left balance frequencies.
Java uses `HashMap<Integer, Integer>` and explicit default lookups.
Both use the original permutation values to classify each side of k.
