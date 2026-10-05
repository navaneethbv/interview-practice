## Interview exercise

A PostgreSQL application frequently requests the latest twenty orders for one customer.
The fictional table has millions of rows and columns `id`, `customer_id`, `created_at`, `status`, and `total_minor`.
Explain how you would investigate a slow query before adding an index.
These notes were reviewed October 4, 2026.

```sql
EXPLAIN
SELECT id, created_at, total_minor
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

## Reason from the access pattern

The query filters by customer and then orders that customer's rows.
A candidate B-tree index is `(customer_id, created_at DESC, id DESC)`.
It can support the equality filter and the requested ordering, allowing early termination after enough qualifying rows.
The second ordering column makes ties deterministic.
An index on `created_at` alone may scan many other customers' orders before finding twenty matches.
An index on `customer_id` alone may still require sorting that customer's matches.

## Inspect evidence

Compare estimated rows with observed rows, scan type, sorting, and the amount of work needed before the limit is satisfied.
`EXPLAIN ANALYZE` executes the statement, so use representative disposable data for this exercise.
`BUFFERS` adds information about buffer activity.
A sequential scan is not automatically a defect: it can be sensible for a small table or a query returning much of the table.

Do not claim that the candidate index improves performance until you measure the same query and data distribution before and after.
Indexes add storage and write work, and the planner's choice depends on statistics and selectivity.
A covering index may reduce heap access in suitable conditions, but adding every selected column increases its size and maintenance cost.

## Follow-up and answer criteria

Change the query to filter by `status` as well.
Ask whether status is selective and whether all customers use the same query before rearranging the index.
A strong answer connects column order to predicates, considers ordering and limits, and proposes a measurement rather than promising a speedup.

## Source

[PostgreSQL's EXPLAIN documentation](https://www.postgresql.org/docs/current/using-explain.html) explains plan interpretation and the execution behavior of `ANALYZE`.
The orders example is original.
