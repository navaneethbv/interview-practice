## Intuition

Only the best `k` songs matter, so storing every registered song is unnecessary.
A min-heap ordered by the weakest ranked song lets the class discard the weakest candidate whenever a better song arrives.
The heap's custom tie behavior makes the alphabetically later title weaker when play counts are equal.

## Approach

Store the capacity `k` and a heap of at most `k` ranked entries.
On `register_plays`, add the song while the heap has room.
Once full, compare the new entry with the weakest heap entry and replace the weakest only when the new song ranks higher.
On `top_k`, sort the retained entries by descending plays and then ascending title, and return their titles.

## Walkthrough

For Example 1, the heap first retains `Boolean Rhapsody`, then `Coding In The Deep`.
When `Here Comes The Bug` arrives with 223 plays, it is stronger than the weakest retained song at 146 plays, so the weaker entry is replaced.
Sorting the two retained songs by rank returns `Here Comes The Bug` followed by `Boolean Rhapsody`.
If titles have equal plays, the title with alphabetically later text is removed first, preserving the required alphabetical order among survivors.

## Complexity

For `m` registrations, each heap insertion or replacement costs `O(log k)`.
The final sorting costs `O(k log k)`, so the total is `O(m log k + k log k)` time.
The heap stores at most `k` entries and uses `O(k)` space.

## Edge cases

Calling `top_k` before any registration returns an empty list.
Fewer than `k` registered songs are all returned.
Equal play counts must be resolved by title in both the heap's weakest comparison and the final output sort.

## Common mistakes

Sorting every registration each time makes repeated queries unnecessarily expensive.
Using alphabetical order in the wrong direction for the weakest heap evicts the wrong tied title.
Returning the heap's internal order violates the required highest-to-lowest output ordering.

## Language notes

Python defines `Ranked.__lt__` so the heap root is the weakest retained entry.
Java uses a comparator for strongest output order and its reverse for the weakest priority queue.
The `plays` value is stored as `long` in Java's record even though the public method accepts an integer.
