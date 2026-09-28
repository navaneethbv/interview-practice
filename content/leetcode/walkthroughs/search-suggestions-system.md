## Intuition

After sorting products lexicographically, all names beginning with a prefix occupy one contiguous range.
Binary search finds the first possible product for each typed prefix, and checking the next three entries is enough.

## Brute force

Scanning every product for every character prefix costs O(pw), where p is the product count and w is the search length.
Sorting once and using binary search avoids repeatedly examining unrelated names.

## Approach

1. Sort `products` lexicographically.
2. For each nonempty prefix of `searchWord`, binary-search its first possible position.
3. Inspect at most three products from that position and keep those that actually start with the prefix.
4. Append one list for every prefix, including an empty list when the first candidate no longer matches.

## Walkthrough

For Example 1, products `['cat','car','cart','dog']` and search word `"car"` sort to `['car','cart','cat','dog']`.
For prefix `"c"`, binary search reaches index 0, and the first three matching products are `car`, `cart`, and `cat`.
For prefix `"ca"`, the same first three names still begin with the prefix.
For prefix `"car"`, `car` and `cart` match, while `cat` is excluded, producing the listed result.

## Complexity

If L is the maximum product length and W is the search length, sorting costs O(p L log p) character comparisons in the worst case.
Each of W prefixes uses O(L log p) comparison work for binary search plus at most three prefix checks.
Python and Java create prefixes while scanning, which can add O(W^2) character copying when W is large.
The output contains at most 3W product references, while sorting and the result list use O(p + W) structural space.

## Edge cases

If no product starts with a prefix, its suggestion list is empty and later prefixes remain empty.
Duplicate product names are retained because the input contract does not require uniqueness.
A one-character search word still produces exactly one suggestion list.

## Common mistakes

Do not assume the first three lexicographic products match the prefix after binary search.
Use the prefix itself as the lower-bound key, not a product-specific search key.
Return one result per typed character, even after matches disappear.

## Language notes

Python uses `bisect_left`, while Java performs the equivalent lower-bound loop manually.
Both references sort the input array or list in place and inspect only a three-item candidate slice.
