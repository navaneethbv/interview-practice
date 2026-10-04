## Intuition

Because titles are registered only once, a song discarded from the current top k can never improve later.
A bounded heap can therefore retain only the strongest songs, with its weakest retained entry ready for replacement.

## Brute force

Sorting every registered song on every query stores unnecessary entries and costs O(n log n) per query.
The fixed ranking of registered songs permits incremental pruning.

## Approach

Store at most k entries in a weakest-first heap.
Rank lower play counts as weaker and, on equal counts, alphabetically later titles as weaker.
Register a song by inserting while space remains, or by replacing the weakest when the new song ranks higher.
For top_k, copy or sort the retained entries into descending plays and ascending title order.
The query must sort because a heap's internal iteration order is not full ranking order.
After each insertion, the retained entries are exactly the strongest min(k, registered) songs.

## Walkthrough

```text
Input: ctor = [2], ops = ["register_plays", "register_plays", "register_plays", "top_k"], args = [["Boolean Rhapsody", 193], ["Coding In The Deep", 146], ["Here Comes The Bug", 223], []]
Output: [null, null, null, ["Here Comes The Bug", "Boolean Rhapsody"]]
```

Example 1 registers Boolean Rhapsody with 193 plays and Coding In The Deep with 146.
The two-slot heap initially keeps both.
Here Comes The Bug arrives with 223 and displaces the weakest 146-play song.
The query sorts the retained pair, returning Here Comes The Bug before Boolean Rhapsody.

## Complexity

Registration takes O(log(k + 1)) heap comparisons in the worst case.
A query sorts at most k songs in O(k log(k + 1)) comparisons and uses O(k) result workspace.
Persistent storage is O(k); title comparisons additionally depend on string length.

## Edge cases

Querying an empty structure returns an empty list.
Fewer than k songs means every registered song is returned.
Equal plays require alphabetical tie-breaking.

## Common mistakes

Do not return raw heap order for the ordered query.
Do not put the strongest song at the removal end of the bounded heap.

## Language notes

Python defines Ranked with reversed title comparison for the weakest-first heap.
Java reverses its best-first comparator for PriorityQueue, then uses the original comparator when sorting a query result.
