## Intuition

Removing days from a window cannot increase its number of distinct titles.
This monotonicity permits a sliding window that expands rightward and shrinks only when a new title pushes the distinct count above k.

## Brute force

Enumerating every period and rebuilding its title set takes quadratic or worse time.
Maintaining per-title frequencies lets adjacent windows share nearly all their work.

## Approach

Store the current window's title frequencies in `counts`.
Add the title at right, then move left while counts contains more than k keys.
Decrement each departing title and delete its key when its frequency reaches zero.
Once feasible, update best with `right - left + 1`.
The window is the longest valid suffix ending at right because any earlier start was removed only while the distinct-title budget was exceeded.
Zero-count keys must disappear so map size equals the actual number of distinct titles.

## Walkthrough

```text
Input: bestSeller = ["book1", "book1", "book2", "book1", "book3", "book1"], k = 2
Output: 4
```

Example 1's first four days contain only book1 and book2, giving length 4.
Adding book3 creates a third title.
Removing the two leading book1 occurrences does not eliminate book1, but removing book2 next restores the limit.
The remaining suffix can extend through the final book1 to length 3.
The earlier best length 4 remains the answer.

## Complexity

Each day enters and leaves at most once, so expected time is O(n) hash-table operations.
The map holds at most k + 1 titles transiently, giving O(min(n, k + 1)) extra space.
String hashing and comparisons add their text-processing costs.

## Edge cases

Empty input returns zero.
If k covers every distinct title, the full array qualifies.
For k equal to one, the answer is the longest equal-title run.

## Common mistakes

Counting total occurrences instead of distinct keys changes the constraint.
Leaving zero-frequency keys in the map can prevent shrinking from terminating correctly.

## Language notes

Python deletes exhausted dictionary entries.
Java uses Map.merge to decrement and explicitly removes entries whose updated count is zero.
