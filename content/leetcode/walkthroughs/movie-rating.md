## Intuition

The two answers are independent rankings, each with its own tie-breaker, combined into one column.

## Approach

1. Rank users by number of ratings descending, then name ascending; take one.
2. Rank February 2020 movies by average rating descending, then title ascending; take one.
3. Combine with `UNION ALL`, keeping the user first.

## Walkthrough

In Example 1, Daniel and Monica each rated three movies, and Daniel comes first alphabetically. In February, Frozen 2 averages (5 + 2) / 2 = 3.5 and Joker (3 + 4) / 2 = 3.5, so Frozen 2 wins the tie.

## Complexity

- Time: O(R log R) for R ratings.
- Space: proportional to the result and any grouping state.

## Edge cases

- The same name can be both answers; `UNION` would collapse it, so use `UNION ALL`.
- Ratings outside February do not affect the movie ranking.

## Common mistakes

- Using `UNION`, which drops a duplicate value.
- Putting `ORDER BY ... LIMIT` directly on the branches of a compound select, which SQLite does not allow.

## SQLite notes

Each branch is wrapped in a subquery so it can have its own `ORDER BY` and `LIMIT`; the outer query keeps the branches in order.
