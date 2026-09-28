## Intuition

A subarray from first+1 through current has sum k when `prefix[current] - prefix[first] = k`.
To maximize length, keep the earliest index for each prefix sum.

## Brute force

Checking every pair of endpoints is O(n²).
A prefix map turns each current endpoint into one lookup.

## Approach

1. Seed prefix sum zero at index -1.
2. Add each value to the running sum.
3. Look for `prefix-k` and update the longest distance.
4. Store the current prefix only if it has not appeared before.

## Walkthrough

For Example 1, `[1,-1,5,-2,3]` with k=3 has prefixes 0,1,0,5,3,6.
At index 3 the prefix is 3, and prefix 0 first appeared at -1.
The interval from 0 through 3 therefore has sum 3 and length 4.

## Complexity

The scan costs O(n) expected time and O(n) map space.
Python uses arbitrary-size prefix keys; Java uses `long` keys to avoid int overflow.
The map's earliest indices are never overwritten.

## Edge cases

Zero-sum prefixes can recur and should keep their earliest index.
Negative values mean a sliding window is not valid.
No match returns zero.

## Common mistakes

Seed index -1 for subarrays beginning at zero.
Use `setdefault` or `putIfAbsent`.
Subtract k in the correct prefix direction.

## Language notes

Both references use a hash map and one pass.
The output is a length, not the subarray itself.
Keeping the earliest prefix index is what maximizes the length when the same prefix sum appears repeatedly.
The prefix sum can be negative, so the hash key is not restricted to nonnegative values.
