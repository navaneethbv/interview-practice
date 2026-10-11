## Intuition

The denominator is the total number of users, independent of any contest, so compute it once with a scalar subquery and divide each contest's registrations by it.

## Approach

1. Group Register by `contest_id` and count users.
2. Divide by `(SELECT COUNT(*) FROM Users)` and multiply by 100.0.
3. Round to two decimals.
4. Order by percentage descending, then `contest_id` ascending.

## Walkthrough

Example 1 has three users. Contests 208, 209 and 210 have all three registered (100%), 215 has two (66.67%) and 207 has one (33.33%). The three ties are listed by contest id.

## Complexity

- Time: O(R log R) for R registrations, dominated by grouping and the final sort.
- Space: proportional to the result and any grouping state.

## Edge cases

- A contest with every user is exactly 100.
- Ties must be broken by contest id.
- Users with no registrations still count in the denominator.

## Common mistakes

- Integer division: `COUNT(*) * 100 / total` truncates in SQLite, so multiply by `100.0`.
- Dividing by the number of distinct registered users instead of all users.

## SQLite notes

SQLite performs integer division when both operands are integers; a REAL literal forces floating-point division.
