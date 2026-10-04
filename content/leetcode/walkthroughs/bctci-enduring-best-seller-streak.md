## Intuition

A qualifying interval exists exactly when some maximal run of equal adjacent titles reaches length k.
Only the length of the current run is needed while scanning daily best sellers.

## Brute force

Checking each length-k window by comparing all its titles takes O(nk) time.
A frequency count over the whole array cannot establish consecutive repetition.

## Approach

For each day, compare its title with the preceding day's title.
If they match, increment `run`; otherwise reset run to one.
Return true immediately when run reaches k.
If the scan finishes without that event, return false.
After each iteration, run is precisely the number of consecutive equal titles ending on that day.
Every possible qualifying interval ends on some day, so testing this invariant at every endpoint is sufficient.

## Walkthrough

```text
Input: bestSeller = ["book3", "book1", "book3", "book3", "book2"], k = 2
Output: true
```

Example 1 begins with book3, giving run 1.
The next title book1 differs, so run resets to 1.
The following book3 also starts a new run of 1.
The next book3 extends it to 2, meeting k and returning true.
The final book2 does not need to be inspected because the required streak has already been found.

## Complexity

The scan takes O(n) title comparisons and O(1) extra space.
When title lengths are not treated as bounded, string comparison cost must also be included.
The method can terminate early after a matching streak.

## Edge cases

With k equal to one, the first day is enough.
A streak ending on the final day still qualifies.
The same title on separated days does not form a longer consecutive run.

## Common mistakes

Reset to one after a change, because the current day begins the next run.
Do not count total title frequency instead of adjacency.

## Language notes

Python compares strings with `==` by content.
Java correctly uses `.equals` rather than reference equality, so separately allocated equal title strings extend the same streak.
