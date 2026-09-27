## Intuition

For each nums1 value, pairs with nums2 form a sorted row of sums.
The smallest unreported pair in each row is enough to choose the global next pair.
A min heap merges these sorted rows.

## Brute force

Generating all m times n pairs and sorting them takes O(mn log(mn)) time and O(mn) space.
The heap starts only the first pair from each of the first k rows.
Each pop advances one row by one column.

## Approach

1. Add the pair with nums2 index zero for up to k nums1 rows.
2. Pop the smallest sum and append its two values.
3. Push the next pair from the same nums1 row.
4. Repeat until k pairs are returned or the heap empties.
5. Use wide sum comparison in Java to avoid integer overflow.

## Walkthrough

Example 1 has nums1 [1,7,11], nums2 [2,4,6], and k 3.
The heap starts sums 3, 9, and 13.
Popping sum 3 returns [1,2] and adds [1,4].
Then sums 5 and 9 make [1,4] next, followed by [1,6].
The result is [[1,2],[1,4],[1,6]].

## Complexity

Let k be requested pairs and m be nums1 length.
The heap contains at most min(k,m) entries, so time is O(k log min(k,m)).
The heap uses O(min(k,m)) auxiliary space.
The returned pairs use O(k) output space.
No full Cartesian product is materialized.

## Edge cases

If either input is empty, no pair exists.
If k is zero, the result is empty.
Fewer than k Cartesian pairs returns every available pair.
Equal sums are still valid and can be returned in any order accepted by the comparator.

## Common mistakes

- Starting every nums2 row creates unnecessary heap entries.
- Advancing nums1 instead of nums2 after a pop skips row candidates.
- Returning sums instead of value pairs changes the result shape.
- Comparing Java int sums can overflow before heap ordering.

## Language notes

Python heap tuples include indices as deterministic tie breakers.
Java stores index pairs and computes sums inside the comparator.
Both return fresh two-value pairs.
