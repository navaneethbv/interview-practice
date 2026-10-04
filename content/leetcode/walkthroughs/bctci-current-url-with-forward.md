## Intuition

Browser history is a sequence of pages plus a cursor pointing at the currently displayed entry.
Back and forward move the cursor, while a new visit replaces the branch of history that used to lie ahead.

## Brute force

Two stacks can simulate each individual movement, but moving up to a billion steps one at a time is unnecessary.
An indexed history list permits each back or forward action to clamp its destination directly.

## Approach

Maintain `pages` and `current`, initially an empty list and -1.
For `go`, increment the cursor, delete entries from that position onward, and append the new URL.
For navigation, subtract or add the parsed step count and clamp to valid history bounds.

## Walkthrough

Example 1 visits Google and Wikipedia, then moves back to Google and forward to Wikipedia.
Backing up three steps stops at Google.
Visiting Netflix removes Wikipedia's forward entry and appends Netflix.
The final forward request cannot move beyond Netflix, so that URL is returned.

## Complexity

For a actions, total time is O(a), excluding URL storage and the bounded numeric string parsing cost.
Although a visit may delete many history entries, each entry is appended and deleted at most once.
The retained history uses O(a) space.

## Edge cases

A back request beyond the oldest page stops at index zero.
A forward request beyond the newest page stops at the last entry.
Repeated URLs are separate visits.
The guaranteed initial `go` ensures a valid current page exists at the end.

## Common mistakes

A new visit must clear only forward history, retaining every earlier page.
Back and forward themselves must not delete entries.
Do not treat a URL string as a unique page identity or lose repeated visits through set storage.

## Language notes

Python removes a suffix with `del pages[current:]`.
Java clears an `ArrayList` suffix through `subList` and parses navigation counts as `long` before clamping.
Both return the string at the final cursor rather than the newest stored entry unconditionally.
