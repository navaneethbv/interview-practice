## Intuition
Fix a source value that will be shifted into k.
Inside the chosen interval, each source occurrence gains one target occurrence, while each existing k loses one because the same x would move it away from k.
Thus the best interval is the maximum subarray sum of weights +1 for source, -1 for k, and 0 otherwise.

## Brute force
Trying every source, interval, and shift directly is cubic or worse.
The only useful shift for a chosen source is `k - source`, so the operation reduces to a maximum-subarray problem for each source value.

## Approach
1. Count the baseline occurrences of k.
2. For each distinct value other than k, scan the array with weights based on source and k.
3. Maintain a Kadane-style gain that never falls below zero.
4. Track the largest gain and add it to the baseline.

## Walkthrough
Example 1 is `[1, 2, 2, 1]` with k equal to 1.
The baseline is two occurrences of 1.
Choosing source 2 gives weights `[-1, +1, +1, -1]`.
The middle interval has gain 2, converting both 2s to 1 while avoiding the endpoints.
Adding that gain to the baseline yields 4.

## Complexity
For U distinct non-k values, Python takes O(N + UN) expected time, including the initial count and set construction.
Java scans all 50 candidate values, so it takes O(50N) time and O(1) auxiliary space.
Python uses O(U + 1) set space; both use O(1) state for each candidate scan.

## Edge cases
Choosing x equal to zero preserves the baseline when no positive gain exists.
If k is the only value, the answer is its full frequency.
An interval containing existing k values may lose them, which the negative weights capture.

## Common mistakes
Counting source gains without subtracting displaced k values overestimates the result.
Allowing a different shift for each element violates the single-operation rule.
Resetting the running gain only after a negative total is the key Kadane invariant.

## Language notes
Python iterates over `set(nums) - {k}` and booleans act as integer weights.
Java scans all values 1 through 50, which is equivalent under the constraints.
Both references keep the baseline separate from the best interval gain.
