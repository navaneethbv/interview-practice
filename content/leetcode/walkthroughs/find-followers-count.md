## Intuition
Each row in `Followers` is one directed relationship from follower to user.
Grouping by `user_id` counts incoming relationships directly, and ordering by that id gives the required rows.

## Brute force
Counting rows separately for each user would rescan the table repeatedly.
One grouped query lets SQLite aggregate all users in one operation.

## Approach

1. Select `user_id` and `COUNT(*) AS followers_count`.
2. Group by `user_id` so each user's incoming rows form one group.
3. Order by `user_id ASC`.
4. Keep reciprocal relationships as separate directed rows.

## Walkthrough
For Example 1, rows `(3,1)`, `(3,2)`, and `(1,2)` group into count 2 for user 3 and count 1 for user 1.
Ascending order produces `[[1,1],[3,2]]`.
For reciprocal rows `(1,2)` and `(2,1)`, both users have one follower and both output rows remain.

## Complexity
The logical aggregation reads r relationship rows and produces u user groups.
An index that supports grouping or ordering can reduce lookup and sort work, while an unindexed SQLite plan may scan and sort all rows.
Describe the actual cost as plan-dependent rather than assuming a particular join or index strategy.
The result itself stores O(u) rows.

## Edge cases
Users appear only when they have at least one follower row.
The uniqueness constraint prevents duplicate copies of the same directed relationship.

## Common mistakes
Group by `user_id`, not `follower_id`.
Do not remove reciprocal rows as duplicates.
Include explicit ascending ordering.

## SQLite notes
Use SQLite `COUNT(*)`, `GROUP BY user_id`, and `ORDER BY user_id ASC`.
Alias the count exactly as `followers_count`.
