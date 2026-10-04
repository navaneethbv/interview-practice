## Intuition

Every signup must appear in the result, including users with no confirmation rows.
A left join preserves those users, and averaging the boolean expression `action = 'confirmed'` gives confirmed requests divided by all requests.

## Brute force

Counting confirmations and requests separately for every signup would repeatedly scan the confirmations table.
The grouped left join lets SQLite aggregate all rows in one query plan.

## Approach

1. Start with `Signups` and left join `Confirmations` by `user_id`.
2. Use `AVG(c.action='confirmed')` so confirmed rows contribute 1 and other actions contribute 0 in SQLite.
3. Wrap the average with `COALESCE(.., 0)` for users with no joined confirmation row.
4. Round to two decimal places and group by `user_id`.

## Walkthrough

In Example 1, user 1 joins to one `confirmed` row and one `timeout` row.
The boolean values average to 0.5, so `ROUND` returns 0.5.
User 2 has no confirmation row, but the left join still creates a grouped row with a null action.
`COALESCE` changes that missing average to 0, producing the two requested rates.

## Complexity

SQLite may execute the join with nested loops or an indexed plan, so join cost depends on table sizes and available indexes.
Grouping and rounding can require temporary storage, and their cost depends on the number of joined rows and users.

## Edge cases

A user with only timeout actions has rate zero.
Several confirmed actions produce a rate of one.
The left join is necessary for signups with no confirmations, and `COALESCE` handles their null aggregate.

## Common mistakes

An inner join would incorrectly drop users with no confirmations.
Counting only confirmed rows would make a partial success look like rate one.
Do not round before averaging, because each user's final ratio must be rounded once.

## SQLite notes

SQLite evaluates the comparison `c.action='confirmed'` as an integer boolean suitable for `AVG`.
`ROUND(value, 2)` supplies the required precision, and `COALESCE` is SQLite-compatible.
The result comparison is unordered, so the query does not need an `ORDER BY` clause.
