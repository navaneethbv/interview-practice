# Actors and Directors Who Cooperated At Least Three Times

Report actor and director pairs appearing in at least three collaboration records.
Count each timestamp as a separate collaboration.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `actor_id`, `director_id`; row order is unrestricted.

## Tables

### ActorDirector

| Column | SQLite type |
| --- | --- |
| actor_id | INTEGER |
| director_id | INTEGER |
| timestamp | INTEGER |

## Constraints

- `timestamp` uniquely identifies a record.
- Actor and director ids are non-null integers.

## Examples

### Example 1

```text
Input: {"tables": {"ActorDirector": [[1, 2, 1], [1, 2, 2], [1, 2, 3], [1, 3, 4]]}}
Output: [[1, 2]]
Explanation: Only pair 1,2 reaches three collaborations.
```

### Example 2

```text
Input: {"tables": {"ActorDirector": [[1, 1, 1], [1, 1, 2]]}}
Output: []
Explanation: Two collaborations do not meet the threshold.
```
