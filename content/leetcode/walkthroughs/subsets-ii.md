## Intuition

Every subset decision is still include or omit, but equal input values can create the same value list.
Sorting puts equal values together so the search can skip a duplicate choice when it appears at one recursion depth.
The first copy may be selected, and a later copy may still be selected deeper in that path.

## Brute force

Enumerating all 2^n index subsets and deduplicating their value lists can take O(n × 2^n) time and output-sized space.
The sorted backtracking search still emits every unique subset, but skips duplicate sibling branches before constructing redundant copies.
## Approach

1. Sort nums into sorted_nums.
2. Start visit at index zero with an empty path.
3. Copy the current path into result because every prefix is a valid subset.
4. Try each value from start_index onward.
5. Skip an equal value when it is not the first choice at this depth.
6. Append the value, recurse from index + 1, and remove it while backtracking.

The index moves forward, so each position is used at most once.
The depth-specific duplicate check preserves subsets such as [2, 2] while removing repeated [2] branches.

## Walkthrough

Example 1 uses nums = [2, 2].

| path | start_index | Action |
| --- | ---: | --- |
| [] | 0 | record the empty subset |
| [2] | 1 | record the singleton |
| [2, 2] | 2 | record the pair |
| [] | 0 | skip the second root-level 2 |

The result is [[], [2], [2, 2]].

## Complexity

Let n be the number of values.
Sorting costs O(n log n), and there can be O(2^n) paths whose copies take up to O(n) each.
The total time is O(n × 2^n), including result copying.
The returned subsets use O(n × 2^n) space, with O(n) auxiliary recursion space.

## Edge cases

An empty input records the empty subset.
All equal values produce one subset for each possible count.
Negative values and zero are sorted and deduplicated by the same depth rule.
A single value produces the empty and singleton subsets.

## Common mistakes

- Skipping every repeated value prevents selecting two equal positions.
- Comparing with the previous value without checking the recursion depth removes valid branches.
- Reusing an index generates a subset larger than the available positions.
- Saving path without copying lets later backtracking change stored answers.

## Language notes

Python uses a copied path at every visit call.
Java sorts the array and copies its mutable path into a new ArrayList.
Both use start_index to make the one-use rule explicit.
