## Intuition

Track consecutive equal values as runs rather than individual stack entries.
When a run reaches k copies, its replacement may match the preceding run, so compression can cascade toward the left.

## Brute force

Repeated scans for the first qualifying block and array replacements can take quadratic time.
A run stack restricts updates to the boundary affected by each incoming value.

## Approach

`_push(runs, value, count, k)` first combines matching top-run copies.
If the combined count reaches k, recursively push the multiplied value with `count // k` copies.
Any `count % k` original copies are appended afterward.
Otherwise append the uncompressed run.
Processing incoming values in order and resolving cascades immediately preserves the first-block rule.
Finally expand each stored run into repeated values for the returned array.
The replacement goes before leftover original copies because the first qualifying block is compressed first.

## Walkthrough

```text
Input: arr = [1, 9, 9, 3, 3, 3, 4], k = 3
Output: [1, 27, 4]
```

Example 1 initially stores runs for 1 and two copies of 9.
The three consecutive 3 values collapse to one 9.
That new 9 joins the preceding pair of 9 values, forming three copies and collapsing again to 27.
The final 4 creates a separate run.
Expanding gives `[1, 27, 4]`.

## Complexity

Each successful compression decreases the represented element count by at least one.
Across all pushes and cascades, time is O(n), including final expansion.
Runs and output use O(n) space, with recursion bounded by the number of cascading runs.

## Edge cases

If k exceeds the array length, nothing compresses.
Zeros still compress because counts decrease even though multiplied values remain zero.
Empty input returns empty output.

## Common mistakes

Do not append leftover copies before resolving the replacement cascade.
Compressing nonadjacent equal runs changes the operation's meaning.

## Language notes

Python integers safely grow through multiplication.
Java stores run values and counts in long arrays and uses reverse deque iteration to restore left-to-right run order.
