## Intuition

A partition can close only after the last occurrence of every character seen in it.
Record each character's last position, then extend the current boundary whenever the scan sees a character whose last occurrence is farther away.
When the scan reaches that boundary, the partition is independent of the suffix.

## Brute force

Trying every cut and checking character ownership repeatedly can take O(n²) time.
The last-position table lets each character update the boundary in constant time.

## Approach

1. Build last_position for every character in s.
2. Track partition_start and the farthest partition_end required so far.
3. For each index, extend partition_end with the current character's last position.
4. When index equals partition_end, record the length and start a new partition.
5. Return the recorded lengths.

## Walkthrough

Example 1 uses s = "abac".
The last positions are a:2, b:1, and c:3.
At index 0, a extends partition_end to 2.
At index 1, b ends at 1, but the boundary stays 2.
At index 2, the boundary is reached, so the first length is 3.
The remaining c closes at index 3, giving [3, 1].

## Complexity

- Time: O(n), for the last-position pass and the partition scan.
- Space: O(k), where k is the number of distinct characters.

## Edge cases

A one-character string produces one partition of length 1.
A string with one repeated character remains one partition.
A string of distinct characters closes a partition at every index.
The fixed lowercase alphabet keeps the Java table constant sized.

## Common mistakes

- Closing when the current character first appears ignores later occurrences.
- Sorting characters destroys the original contiguous order.
- Forgetting to reset partition_start produces cumulative lengths.
- Using the first occurrence instead of the last occurrence gives invalid cuts.

## Language notes

Python builds a dictionary from enumerate.
Java stores last positions in an array indexed by lowercase letters.
