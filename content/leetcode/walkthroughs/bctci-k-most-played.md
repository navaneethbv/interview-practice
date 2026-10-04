## Intuition

Keep only the strongest k songs seen so far, with the weakest retained song at the heap root.
A new song needs to replace that root only when it ranks higher.

## Brute force

Sorting every song by descending play count and ascending title takes O(n log n) comparisons and stores all ranking entries.
A bounded heap reduces the retained set to at most k songs.

## Approach

The ranking compares play counts first and alphabetical title order second.
Maintain `weakest` so lower plays and, on ties, alphabetically later titles have lower priority for retention.
Python inserts until full, then replaces the root only for a stronger entry.
Java inserts each candidate and removes the weakest whenever size exceeds k.
After each song, the heap contains exactly the best min(k, processed) songs.
Heap enumeration is not sorted, which is allowed by the output contract.

## Walkthrough

```text
Input: titles = ["All the Single Brackets", "Oops! I Broke Prod Again", "Coding In The Deep", "Boolean Rhapsody", "Here Comes The Bug", "All About That Base Case"], plays = [132, 274, 146, 193, 291, 291], k = 3
Output: ["All About That Base Case", "Here Comes The Bug", "Oops! I Broke Prod Again"]
```

Example 1's two 291-play songs outrank every other song.
The 274-play song beats the remaining counts 193, 146, and 132.
Thus the retained titles are All About That Base Case, Here Comes The Bug, and Oops! I Broke Prod Again.
Alphabetical order resolves the tie between the two 291-play titles if a cutoff separates them.

## Complexity

For n songs, heap work is O(n log(k + 1)) comparisons.
String comparisons can add a factor proportional to title length.
Java retains O(k) indices; Python stores reversed-title keys totaling the retained title lengths and builds each candidate key.

## Edge cases

If k exceeds n, retain every title.
An empty input returns empty output.
Prefix-related titles require correct alphabetical ordering.

## Common mistakes

A strongest-at-root heap would discard the wrong song.
Equal play counts must not ignore title ordering.

## Language notes

Python encodes reversed character priorities with a terminating marker to handle prefix titles.
Java reverses an explicit count-and-title comparator for its PriorityQueue.
