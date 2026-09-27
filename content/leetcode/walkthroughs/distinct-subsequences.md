## Intuition

Each source character can either be skipped or used to match the next needed character in t.
The number of ways to match a target prefix is enough to build the count for the next prefix.
Processing target positions backward lets one array represent the previous source prefix without reusing a character twice.

## Brute force

A recursive choice at every source character branches into skip and use cases.
Different branches repeatedly solve the same source and target prefixes, producing exponential time.
Dynamic programming merges those identical prefix states.

## Approach

1. Let ways[target_index] count ways to form a target prefix from processed characters.
2. Initialize ways[0] = 1, representing the empty target.
3. For each source_character, scan target positions from right to left.
4. When characters match, add ways[target_index] into ways[target_index + 1].
5. Return ways[-1].

The reverse scan is essential because the current source character must contribute at most once.

## Walkthrough

Example 1 uses s = "babgbag" and t = "bag".

| Source character | Updated target match | Resulting counts for empty, b, ba, bag |
| --- | --- | --- |
| b | b | [1, 1, 0, 0] |
| a | ba | [1, 1, 1, 0] |
| b | b | [1, 2, 1, 0] |
| g | bag | [1, 2, 1, 1] |
| b | b | [1, 3, 1, 1] |
| a | ba | [1, 3, 4, 1] |
| g | bag | [1, 3, 4, 5] |

The final count is 5.

## Complexity

- Time: O(len(s) × len(t)), for the nested source and target scans.
- Space: O(len(t)), for the one-dimensional ways array.

## Edge cases

If t is longer than s, the final count remains zero.
Equal repeated letters contribute distinct index choices.
An empty target would have one subsequence, represented by ways[0].
The Java reference saturates intermediate counts at Integer.MAX_VALUE, and counts only increase, so an overflowing prefix could not later produce a promised in-range final result.

## Common mistakes

- Scanning target positions left to right reuses the same source character.
- Counting distinct spellings instead of distinct index selections gives the wrong result.
- Forgetting the empty-target base case shifts every count.
- Replacing rather than adding matching choices loses earlier subsequences.

## Language notes

Python integers grow automatically.
Java uses long during addition and clamps to the specified integer maximum.
Both references use the same backward one-dimensional recurrence.
