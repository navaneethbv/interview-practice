## Intuition
For a prefix ending at the current index, a previous prefix with sum `current - goal` forms a subarray with the desired sum.
Counting previous prefix sums turns every endpoint into a constant-time lookup.
Zeros are handled naturally because they create repeated equal prefix sums and therefore multiple valid starts.

## Brute force
Enumerating every start and end pair takes O(N squared) time.
Maintaining a running subarray sum can remove an inner recomputation but still leaves the quadratic number of windows.
Prefix-frequency counting reduces the scan to linear time.

## Approach
1. Seed the frequency map with prefix sum zero occurring once.
2. Scan each binary value and update the running prefix sum.
3. Add the number of previous prefixes equal to `prefix - goal`.
4. Record the current prefix for later endpoints.

## Walkthrough
Example 1 is `[1, 0, 1, 0, 1]` with goal 2.
The prefix sums are 1, 1, 2, 2, and 3.
At the first prefix 2, the lookup is `2 - 2 = 0`, which has occurred once, giving one window.
The next prefix 2 finds that same earlier zero prefix and adds one more window.
The final prefix 3 looks up `3 - 2 = 1`, which occurred twice, so the total is `1 + 1 + 2 = 4`.

## Complexity
The input is scanned once, so time is O(N).
The prefix map stores at most N plus one sums, using O(N) extra space.

## Edge cases
When goal is zero, repeated zero prefixes count all-zero windows.
If goal exceeds the total number of ones, no lookup succeeds.
A single zero with goal zero is counted through the seeded prefix.

## Common mistakes
Adding the current prefix to the map before querying counts an empty window.
Using only distinct prefix sums loses multiplicity from repeated zeros.
The target is a sum, so subarray endpoints must remain contiguous.

## Language notes
Python uses `defaultdict(int)` so unseen prefix sums start at zero.
Java uses `HashMap` and `getOrDefault`, with an integer result within the maximum number of subarrays.
Neither reference relies on the binary property beyond the input contract, although it keeps sums nonnegative.
