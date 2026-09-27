## Intuition

Evict the least frequently used key, breaking frequency ties by least recent use.
Map each frequency to an insertion-ordered key set so both choices are constant-time on average.

## Brute force

Scanning all keys to find the least frequency costs O(capacity) per eviction.
The frequency groups avoid that scan.

## Approach

1. Store values and current frequencies by key.
2. Store keys in a LinkedHashSet for each frequency.
3. On access or update, move the key to the next frequency group.
4. Evict the oldest key from the minimum-frequency group when full.

## Walkthrough

Example 1:

With capacity 2, put 1 then 2.
get 1 returns 10 and raises key 1's frequency.
put 3 evicts key 2 because it remains at the lower frequency, so get 2 returns -1 and get 3 returns 30.

## Complexity

Each get and put is O(1) expected time.
Maps and frequency groups use O(capacity) space.
Python OrderedDict and Java LinkedHashSet both preserve least-recent order within a frequency.

## Edge cases

Capacity zero ignores puts and returns -1 for gets.
Updating an existing key raises its frequency after replacing its value.
Equal frequency ties evict the least recently touched key.

## Common mistakes

Do not reset a key's frequency when updating its value.
Advance minimum frequency when its group becomes empty.
Remove an evicted key from both values and frequency maps.

## Language notes

Python uses defaultdict and OrderedDict.
Java uses HashMap and LinkedHashSet with explicit group creation.
The minimum-frequency field points directly to the group eligible for eviction.
