## Intuition

Each input value has exactly two choices for a subset: leave it out or append it to every subset built so far.
Starting with the empty subset makes the first round create all subsets that contain the first value.
Repeating that doubling process covers every include or omit decision exactly once.

## Brute force

Enumerating all 2^n include-or-omit patterns is unavoidable because every subset must be emitted, and copying each result costs O(n × 2^n) time and output space.
A recursive search can produce the same bounds, while the iterative doubling used here makes each decision layer explicit and avoids recursive state management.
## Approach

1. Initialize result with the empty list.
2. For each value in nums, record the number of subsets that existed before this value.
3. Copy each of those existing subsets, append value, and add the copy to result.
4. Return the completed list after every value has been processed.

The saved existing_count is important because newly appended subsets must wait for the next input value.
No duplicate filtering is needed because this problem treats each input position as an independent choice.

## Walkthrough

Example 1 uses nums = [1, 3].

| Step | Existing subsets | Appended copies | result |
| --- | --- | --- | --- |
| Start | none | [] | [[]] |
| value = 1 | [[]] | [1] | [[], [1]] |
| value = 3 | [[], [1]] | [3], [1, 3] | [[], [1], [3], [1, 3]] |

The final list contains one entry for each choice pattern across the two positions.

## Complexity

Let n be the length of nums.
There are 2^n subsets, and copying a subset can take O(n), so the time is O(n × 2^n).
The returned subsets occupy O(n × 2^n) space, with O(1) auxiliary state beyond the result list.
The code does not sort or mutate nums.

## Edge cases

An empty input returns [[]], representing the one empty subset.
A single value returns the empty subset and the singleton subset.
The statement supplies unique values, so every include or omit pattern produces a distinct subset.
Negative values and zero are copied exactly like positive values.

## Common mistakes

- Iterating over the growing result without existing_count can reuse a value repeatedly in one round.
- Appending the same mutable list object causes later changes to alter earlier subsets.
- Returning only nonempty subsets drops the valid empty subset.
- Sorting is unnecessary because the input order already identifies each distinct value.

## Language notes

Python creates each new subset with list concatenation.
Java creates an ArrayList copy before appending value, which prevents aliasing.
Both use existingCount to make the iterative layers identical.
