## Intuition

Friendship is symmetric, so a person's friend count is the number of times they appear on either side of an accepted request.

## Approach

1. Stack requester ids and accepter ids with `UNION ALL`.
2. Group by id and count.
3. Return the id with the largest count.

## Walkthrough

In Example 1, person 3 appears in (1, 3), (2, 3) and (3, 4): three friends.

## Complexity

- Time: O(R log R) for R accepted requests.
- Space: proportional to the result and any grouping state.

## Edge cases

- Being only an accepter still counts.
- Exactly one person has the maximum, so `LIMIT 1` is unambiguous.

## Common mistakes

- Using `UNION` instead of `UNION ALL` removes repeated ids before counting.

## SQLite notes

The unique-pair constraint means each friendship is counted once per person.
