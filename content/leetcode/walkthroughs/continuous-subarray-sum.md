## Intuition

Two prefix sums have the same remainder modulo k when the sum between them is divisible by k.
Store the earliest index for each remainder, because the earliest occurrence gives the longest candidate segment.
Requiring a distance of at least two enforces the minimum subarray length.

## Brute force

Enumerating every start and end pair and summing each segment independently can take O(n³) time.
Prefix sums reduce each segment sum to O(1), but checking all pairs still takes O(n²).
The remainder map finds a qualifying pair during one scan.

## Approach

1. Store remainder zero at virtual index -1.
2. Accumulate each value modulo k.
3. If the remainder appeared before, test whether the distance is at least two.
4. Otherwise store the current index as the first occurrence.
5. Return true on a valid segment and false after the scan.

## Walkthrough

Example 1 uses nums = [23,2,4,6,7] and k = 6.

| index | value | remainder | first index map change |
| ---: | ---: | ---: | --- |
| -1 | none | 0 | 0 -> -1 |
| 0 | 23 | 5 | 5 -> 0 |
| 1 | 2 | 1 | 1 -> 1 |
| 2 | 4 | 5 | existing 5 at 0, distance 2 |

The segment from indexes 1 through 2 sums to 6, so the method returns true.

## Complexity

Let n be nums length.
The scan performs constant work per value, giving O(n) time.
The remainder map stores at most O(min(n,k)) entries and uses that much auxiliary space.
Java keeps the running remainder as long to make the addition safe before modulo.

## Edge cases

A single-element array cannot satisfy the required length.
Two zeros form a valid segment for any positive k.
A remainder is stored only at its earliest index to maximize segment length.
The statement guarantees k is positive, so modulo by zero is not required.

## Common mistakes

- Replacing an earlier remainder index can turn a valid long segment into an invalid short one.
- Accepting a repeated remainder at distance one violates the length rule.
- Comparing raw prefix sums misses equivalent modulo classes.
- Using an O(n²) nested search discards the key prefix invariant.

## Language notes

Python dictionaries use integer remainders and arbitrary precision totals.
Java uses `Map<Long,Integer>` and a long remainder while returning a boolean.
Both seed remainder zero at index -1 to represent a prefix before the first element.
