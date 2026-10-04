## Intuition

A valid window has no title appearing twice.
While a fixed-size window slides, only one title enters and one title leaves.
Tracking how many titles have reached count two lets the algorithm test uniqueness without rescanning the window.

## Brute force

For every starting day, inserting the next k titles into a fresh set takes O(k) time.
Across all windows this can take O(nk), which is too slow for a million days.

## Approach

Add the current title to counts as the right edge advances.
When its count becomes two, increment repeated.
Once the window exceeds k, decrement the title at day minus k.
When that count falls from two to one, decrement repeated.
After a full window exists, repeated equal to zero means every title in that window is distinct.

## Walkthrough

In Example 1, the first full window of length three is book3, book1, book3, so repeated is one.
As the window moves, the leaving title is removed before the next uniqueness check.
The window book2, book3, book4 contains three different titles, so repeated reaches zero and the method returns true.
For k equal to four, every full window still contains a repeated title, so the result is false.

## Complexity

Each title enters and leaves the sliding window once.
The scan takes O(n) time and the counts map uses O(k) space for the active window.

## Edge cases

When k is one, the first available window is always unique.
Two equal neighboring titles make their length-two window invalid.
The window can contain titles that appeared in earlier windows without affecting the current test.
The method returns false only after every full window has been checked.

## Common mistakes

Checking only whether the newest title repeats misses duplicates left elsewhere in the window.
Removing the outgoing title after testing leaves stale counts in the map.
Using a set without tracking counts cannot know when a leaving duplicate stops being repeated.

## Language notes

Python updates a dictionary with get and assignment.
Java uses Map.merge to increment and decrement counts in the same control flow.
Both references count a title as repeated only when its count crosses the threshold of two.
