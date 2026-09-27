## Intuition

Only the current head of each nonempty list can be the next globally smallest node.
A min-heap selects that node efficiently among the k active streams.
After removing it, its successor becomes the new candidate from the same list.

## Brute force

Repeatedly scan every list head to select the minimum.
For N total nodes and k lists, this costs O(Nk) time.
A heap reduces each selection and replacement to logarithmic work in the number of active lists.

## Approach

1. Put the head of every nonempty list into `heap`, ordered by node value.
2. Initialize `dummy` and `tail` for the merged list.
3. Pop the minimum node and attach it to `tail.next`.
4. Move `tail` to that node and push its successor if one exists.
5. Repeat until the heap is empty, then return `dummy.next`.

At most one candidate from each input list is active in the heap.
Every candidate is the smallest unconsumed value in its own sorted stream, so the minimum candidate is safe to append globally.

## Walkthrough

Example 1 merges `[[1, 6], [2, 4], [3, 5]]`.
Heap values below are displayed in sorted order, not internal heap-array order.

| Node removed | Successor pushed | Candidate values afterward |
| --- | --- | --- |
| 1 | 6 | `[2, 3, 6]` |
| 2 | 4 | `[3, 4, 6]` |
| 3 | 5 | `[4, 5, 6]` |
| 4 | None | `[5, 6]` |
| 5 | None | `[6]` |
| 6 | None | `[]` |

The appended nodes form `[1, 2, 3, 4, 5, 6]`.

## Complexity

- Time: O(k + N log(k + 1)) as an upper bound, including scanning possibly empty input lists and processing all nodes.
- Space: O(k) auxiliary heap space; existing nodes supply the output list.

## Edge cases

No lists or only empty lists return null.
Duplicate values remain in the output.
One nonempty list is processed through a heap of size one.
The algorithm assumes distinct acyclic input list structures as provided by the fixtures.

## Common mistakes

- Pushing every node initially uses unnecessary O(N) heap storage.
- Forgetting to push a removed node's successor loses the remainder of its list.
- Comparing node objects directly in Python fails when values tie.

## Language notes

Python heap entries include `(value, list_index, node)` so tied values use a numeric tiebreaker.
Java's comparator compares `node.val` directly and permits equal priorities without comparing node objects.
Both reuse and rewire the original nodes rather than allocating a new node for each value.
