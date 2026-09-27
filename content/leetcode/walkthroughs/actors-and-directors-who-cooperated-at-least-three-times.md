## Intuition
A pair qualifies when its actor and director ids occur together in at least three records.
Grouping by both ids and filtering the group count expresses this directly.

## Brute force
Counting each pair with a separate scan repeats work for every actor-director combination.
One grouped aggregation handles all combinations at once.

## Approach

1. Group `ActorDirector` rows by `actor_id` and `director_id`.
2. Count rows in each group, then keep groups whose count is at least 3 with `HAVING COUNT(*) >= 3`.
3. The timestamp is not part of the grouping because each timestamped record is one collaboration.

## Walkthrough
For Example 1, pair `(1,2)` appears at timestamps 1, 2, and 3, so its count is 3 and it qualifies.
Pair `(1,3)` appears once and is filtered out.
The result is `[[1,2]]`.
Two records for the same pair do not meet the threshold in Example 2.

## Complexity
The aggregation processes r collaboration rows and creates one group per distinct pair.
Indexing and temporary grouping costs depend on SQLite's query plan, so the practical cost may include indexed lookups or temporary sort/hash storage.
The logical result uses O(p) rows for p qualifying pairs.

## Edge cases
Exactly three records qualifies.
Different timestamps for the same pair must each count.
A pair with no group cannot appear in the result.

## Common mistakes
Group by both ids, not actor alone.
Use `HAVING`, not `WHERE`, for the aggregate threshold.
Do not count distinct timestamps unless the schema requires it, because each row is already a separate record.

## SQLite notes
Use `COUNT(*) AS collaborations` only if selecting the count is allowed, then filter with `HAVING COUNT(*) >= 3`.
Return only `actor_id` and `director_id` as required.
