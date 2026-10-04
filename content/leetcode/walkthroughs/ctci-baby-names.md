## Intuition

Synonymy forms connected components, including names that appear only in synonym pairs.
Each component contributes one total, labeled by its alphabetically smallest member.
A disjoint-set structure merges those components while preserving the required representative name.

## Brute force

For each named count, traverse the entire synonym graph again to find its component and representative.
Repeated traversals redo the same connectivity work for many names in the same group.

## Approach

`find` creates an unseen name as its own parent and follows parent links to the root, compressing paths.
For each synonym pair, find both roots and attach the alphabetically larger root below the smaller one.
After all unions, add each supplied count to `totals[find(name)]`.
Emit one `Name:total` string per total.
Because roots always merge toward the smaller name, the final root is the minimum across the entire component, even if that name has no direct count entry.

## Walkthrough

Example 1 merges Jon with John and then connects Johnny to the same group.
John is its alphabetically smallest spelling, and counts 15 and 12 sum to 27.
Chris, Kris, and Christopher form another component represented by Chris.
Their counts sum to `13 + 4 + 19 = 36`.
Return `John:27` and `Chris:36` in either order.

## Complexity

Space is O(V) for V distinct names plus output.
Path compression speeds repeated finds, but the reference does not union by rank or size.
A conservative worst-case bound is O((P + N)V) parent traversals for P synonym pairs and N counted names, excluding string-comparison costs.

## Edge cases

Names absent from every synonym pair remain singleton groups.
A component appearing only in synonyms produces no output unless a counted name belongs to it.

## Common mistakes

Grouping only directly paired names misses transitive synonym chains.
Choosing representatives only from counted names can miss a smaller spelling introduced by synonyms.

## Language notes

Python uses dictionary parents and path halving.
Java compresses paths in a second pass and uses a linked map for totals; neither output order is required by the contract.
