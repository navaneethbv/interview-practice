## Intuition

The employee records form a directed hierarchy from manager to subordinate.
Starting at the requested `id`, a stack visits every reachable employee exactly once because the input contains no cycles.

## Brute force

A repeated scan could search the entire employee list for each subordinate ID.
That adds unnecessary lookup work and can become quadratic when the hierarchy is deep.

## Approach

1. Build `employees_by_id` so an ID directly finds its employee record.
2. Put the requested `id` in `pending_ids`.
3. Pop one ID, add that employee's importance, and push all subordinate IDs.
4. Stop when no pending IDs remain and return `total_importance`.

## Walkthrough

For Example 1, employee 1 has importance 5 and subordinates 2 and 3.
The stack starts with 1, so the total becomes 5 and IDs 2 and 3 are added.
Popping 3 adds 2, then popping 2 adds 3.
The stack is empty and the total is `10`.

## Complexity

Building the lookup costs `O(e)` time and space for `e` employees.
The traversal visits each reachable employee once, so it adds `O(e)` time and `O(e)` worst-case pending-stack space.

## Edge cases

Querying a leaf adds only that employee's importance.
Negative importance values are included normally, and a manager with no subordinates terminates immediately.

## Common mistakes

- Summing only direct subordinates misses indirect reports.
- Searching the list by ID inside the traversal hides a quadratic cost.
- Treating importance as nonnegative would mishandle Example 2's negative value.

## Language notes

Python uses a list as a stack, while Java uses `ArrayDeque<Integer>` and `addAll` for subordinate IDs.
The harness supplies `Employee` objects, so neither reference reconstructs the helper class.
