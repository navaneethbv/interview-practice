## Intuition

A length-k period has all distinct titles exactly when no title occurs at least twice inside it.
Track how many titles are repeated, rather than rescanning the whole frequency map after every window movement.

## Brute force

Building a set for every length-k window takes O(nk) time.
Sliding frequencies reuse the previous window's counts and update only the entering and leaving titles.

## Approach

Increment the new title's count and increase `repeated` only when its count becomes two.
Once the window exceeds k positions, decrement the departing title's count and decrease repeated only when that count becomes one.
After a complete window exists, return true if repeated is zero.
Counts above two still represent one repeated title, so only crossings between one and two change the counter.
If every full window fails, return false.

## Walkthrough

```text
Input: bestSeller = ["book3", "book1", "book3", "book3", "book2", "book3", "book4", "book3"], k = 3
Output: true
```

Example 1 first sees `[book3, book1, book3]`, which repeats book3.
Later windows also contain repeated book3 until the period `[book2, book3, book4]` at indices 4 through 6.
Removing the older book3 occurrence lowers its count to one, leaving repeated equal to zero.
That complete three-day window has distinct titles and returns true.

## Complexity

Each day causes at most two expected constant-time map updates, giving O(n) expected time apart from string processing.
The references retain zero-count keys, so map storage is O(U) for all distinct titles encountered, rather than only O(k).

## Edge cases

For k equal to one, the first day qualifies.
Multiple copies of one title affect repeated only once.
The final possible window must still be checked.

## Common mistakes

Do not increment repeated for every count above two.
Do not report success before k days have entered the window.

## Language notes

Python uses a dictionary and explicit transition checks.
Java's Map.merge returns each updated count, allowing the same one-to-two and two-to-one transition tests.
