## Intuition

A qualifying streak must be contained in a maximal run of equal consecutive titles.
The only information needed at each day is the length of the equal-title suffix ending there.
If that suffix reaches `k`, the requested streak already exists.

## Brute force

For every possible starting day, inspect the next k titles for equality.
In the worst case this performs O(nk) title comparisons, repeatedly checking the same neighboring days.

## Approach

Initialize `run` to zero and scan `bestSeller` in order.
On the first day, or whenever the current title differs from the previous day's title, set `run = 1`.
Otherwise increment `run`.
After each update, return true immediately if `run >= k`.
If the loop finishes, return false.
By induction, `run` is exactly the consecutive suffix length: an equal title extends the previous suffix, while a changed title can only begin a new suffix of length one.

## Walkthrough

Example 1 has `book3, book1, book3, book3, book2` and `k = 2`.
Day 0 starts a run of one `book3`.
Day 1 changes the title and resets the run to one; day 2 resets it again to one `book3`.
Day 3 matches day 2, making `run = 2`.
The method returns true immediately without needing to inspect the final `book2`.

## Complexity

The algorithm makes O(n) title comparisons and uses O(1) auxiliary space.
If title length is not treated as bounded, comparisons contribute up to O(nL) character work for maximum title length L.

## Edge cases

For `k = 1`, the first day proves the answer true.
A streak may begin at the first day or end at the final day.

## Common mistakes

Global title frequency does not establish consecutiveness.
Reset the run to one after a change, because the new title already occupies the current day.

## Language notes

Python compares strings by value using `==`.
Java uses `.equals`, since `==` would compare string object identities.
