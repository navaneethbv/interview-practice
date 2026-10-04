## Intuition

For a fixed right endpoint, a subarray contains each remainder exactly when its start is no later than the most recent occurrence of every remainder.
The earliest of those three latest positions determines all valid starts.

## Brute force

Enumerating all subarrays and checking their remainders takes at least quadratic time.
Only the latest index for each of the three classes is needed while scanning.

## Approach

Initialize `last` to `[-1, -1, -1]`.
At each index, update `last[value % 3]`.
Add `min(last) + 1` to `total`.
If the minimum is p, starts 0 through p include the latest occurrence of every class.
Any later start excludes the class whose most recent index is p, so it cannot qualify.
A missing class retains -1 and therefore contributes zero valid starts.
Each subarray is counted once at its own right endpoint.

## Walkthrough

```text
Input: arr = [1, 2, 3, 4, 5]
Output: 6
```

Example 1 sees remainders 1, 2, 0, 1, 2.
The first two positions contribute zero because remainder 0 is missing.
After value 3, the latest indices are `[2, 0, 1]`, giving one valid start.
After value 4 they are `[2, 3, 1]`, giving two.
After value 5 they are `[2, 3, 4]`, giving three.
The total is 1 + 2 + 3 = 6.

## Complexity

Each element updates and inspects three fixed entries, giving O(n) time.
The latest-position array uses O(1) extra space.
The answer may reach O(n squared).

## Edge cases

Fewer than three elements cannot cover all classes.
If any remainder is absent entirely, the answer is zero.
Repeated values still create distinct positional subarrays.

## Common mistakes

Use the minimum latest index, not the maximum.
Initialize unseen classes to -1 rather than zero.

## Language notes

Inputs are positive, so Python and Java remainder operators agree directly.
Java returns long to hold the potentially large count.
