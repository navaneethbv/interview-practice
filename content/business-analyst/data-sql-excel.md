Almost every BA job asks for Excel, and many ask for SQL. You don't need to be a programmer — you need to pull, check and summarize data confidently. This chapter starts from zero.

## Data basics

> **In short:** Data lives in tables of rows and columns, linked by keys.

- A **table** stores data about one kind of thing (Transactions, Accounts, Customers).
- A **row** (record) is one item — one transaction.
- A **column** (field) is one attribute — amount, currency, value date.
- A **data type** says what kind of value a column holds: text (string), whole number (integer), decimal, date, true/false (boolean).
- A **primary key** uniquely identifies each row (transaction_id).
- A **foreign key** points to a row in another table (transactions.account_id → accounts.account_id).

### Example tables used in this chapter

**accounts**

| account_id | account_name | country | currency |
| --- | --- | --- | --- |
| 1 | AU Nostro Main | Australia | AUD |
| 2 | NZ Nostro Main | New Zealand | NZD |
| 3 | SG Nostro Main | Singapore | SGD |

**transactions**

| txn_id | account_id | amount | value_date | status |
| --- | --- | --- | --- | --- |
| 101 | 1 | 1250.00 | 2026-03-14 | MATCHED |
| 102 | 1 | 980.50 | 2026-03-14 | UNMATCHED |
| 103 | 2 | 4100.00 | 2026-03-15 | UNMATCHED |
| 104 | 4 | 75.00 | 2026-03-15 | MATCHED |

Notice transaction 104 has account_id 4, which doesn't exist in accounts. That's a **data quality** problem — remember it for the JOIN lesson.

### Structured versus unstructured

**Structured data** fits in tables (transactions). **Unstructured data** doesn't (emails, PDFs, call recordings). BAs mostly work with structured data.

## Excel essentials

> **In short:** A handful of formulas cover most BA work.

| Formula | What it does | Example |
| --- | --- | --- |
| `SUM`, `AVERAGE`, `MIN`, `MAX`, `COUNT` | Basic statistics | `=SUM(C2:C100)` |
| `COUNTIF` / `COUNTIFS` | Count rows meeting one / several conditions | `=COUNTIFS(E:E,"UNMATCHED",B:B,1)` |
| `SUMIF` / `SUMIFS` | Sum values meeting conditions | `=SUMIFS(C:C,E:E,"UNMATCHED")` |
| `IF` | Return one value if true, another if false | `=IF(F2>30,"Aged","Current")` |
| `IFS`, nested `IF` | Several conditions | `=IFS(F2>60,"60+",F2>30,"31-60",TRUE,"0-30")` |
| `XLOOKUP` (newer) / `VLOOKUP` | Look up a value from another table | `=XLOOKUP(B2,Accounts!A:A,Accounts!D:D,"Not found")` |
| `INDEX` + `MATCH` | Flexible lookup, works in older Excel | `=INDEX(Accounts!D:D,MATCH(B2,Accounts!A:A,0))` |
| `IFERROR` | Replace errors with a value | `=IFERROR(VLOOKUP(...),"Missing")` |
| `TODAY`, `DATEDIF`, date subtraction | Age calculations | `=TODAY()-D2` gives days since value date |
| `TEXT`, `LEFT`, `RIGHT`, `MID`, `TRIM`, `CONCAT` | Clean and combine text | `=TRIM(A2)` removes extra spaces |
| `UNIQUE`, `FILTER`, `SORT` (Excel 365) | Dynamic lists | `=UNIQUE(B2:B100)` |

### VLOOKUP gotchas

`=VLOOKUP(lookup_value, table, column_number, FALSE)`

- Always use **FALSE** (exact match) as the last argument, or you may get wrong results silently.
- VLOOKUP only looks to the **right** of the lookup column. XLOOKUP and INDEX/MATCH don't have this limit.
- `#N/A` means the value wasn't found — often caused by extra spaces or numbers stored as text.

### Other Excel skills interviewers ask about

- **Conditional formatting** — highlight cells (aged items in red).
- **Data validation** — dropdown lists so users can only enter allowed values.
- **Filters and sorting**, **freeze panes**, **remove duplicates**.
- **Power Query** — import, clean and combine data from many files repeatably, without manual copy-paste.

## Pivot tables

> **In short:** Summarize thousands of rows in seconds by dragging fields.

A **pivot table** groups and summarizes data. You drag fields into four areas:

- **Rows** — what to group by (country).
- **Columns** — a second grouping (status).
- **Values** — what to calculate (sum of amount, count of txn_id).
- **Filters** — limit the data (only March).

Result:

| Country | MATCHED | UNMATCHED | Total |
| --- | --- | --- | --- |
| Australia | 1 | 1 | 2 |
| New Zealand | 0 | 1 | 1 |

Tips:

- Format your data as a **Table** (Ctrl+T) first, so the pivot picks up new rows when you refresh.
- Use **Count** to count items and **Sum** to total amounts — a common mistake is summing IDs.
- **Slicers** add clickable filter buttons, great for simple dashboards.
- Always **refresh** after the source data changes.

## SQL: SELECT, WHERE and ORDER BY

> **In short:** SQL asks a database a question and returns a table.

**SQL** (Structured Query Language) reads and changes data in relational databases (Oracle, SQL Server, PostgreSQL, MySQL, Snowflake…). BAs mostly *read* data with `SELECT`.

```sql
-- All unmatched transactions, newest first
SELECT txn_id, account_id, amount, value_date
FROM transactions
WHERE status = 'UNMATCHED'
ORDER BY value_date DESC;
```

- `SELECT` — which columns (`*` means all; avoid it on big tables).
- `FROM` — which table.
- `WHERE` — which rows (filter).
- `ORDER BY` — sort (`ASC` ascending is the default, `DESC` descending).

### Useful WHERE conditions

```sql
WHERE amount > 1000
WHERE status IN ('UNMATCHED', 'ESCALATED')
WHERE value_date BETWEEN '2026-03-01' AND '2026-03-31'   -- BETWEEN includes both ends
WHERE reference LIKE 'INV%'          -- starts with INV (% = any characters)
WHERE reference IS NULL              -- missing value (never use = NULL)
WHERE amount > 1000 AND status = 'UNMATCHED'
```

Other handy keywords: `DISTINCT` (unique values), `LIMIT 10` / `TOP 10` (first rows only; the keyword depends on the database), and `AS` for column aliases.

> **Practice:** This site has a **SQL 50** problem list you can solve in the browser: [SQL 50](/problems/sets/sql-50). Start with the easy ones.

## SQL: aggregation with GROUP BY and HAVING

> **In short:** Group rows, then count or total each group.

**Aggregate functions** summarize many rows: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.

```sql
-- Number and total value of unmatched items per account
SELECT account_id,
       COUNT(*)    AS unmatched_count,
       SUM(amount) AS unmatched_amount
FROM transactions
WHERE status = 'UNMATCHED'
GROUP BY account_id
HAVING COUNT(*) > 5
ORDER BY unmatched_amount DESC;
```

- `GROUP BY` — makes one result row per group. Every selected column must be either in the GROUP BY or inside an aggregate.
- `WHERE` filters **rows before** grouping.
- `HAVING` filters **groups after** aggregation (you can use aggregates like `COUNT(*)` in HAVING, not in WHERE).

### Order of execution

SQL is *written* as SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY, but the database *processes* it roughly as:

**FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY**

This explains why WHERE can't use aggregates and why a column alias from SELECT usually can't be used in WHERE.

### COUNT details

- `COUNT(*)` counts all rows.
- `COUNT(column)` counts rows where that column is **not NULL**.
- `COUNT(DISTINCT column)` counts unique non-null values.

## SQL: JOINs

> **In short:** JOINs combine tables using matching keys.

```sql
SELECT t.txn_id, a.account_name, t.amount
FROM transactions t
INNER JOIN accounts a ON t.account_id = a.account_id;
```

| Join | Returns |
| --- | --- |
| **INNER JOIN** | Only rows with a match in **both** tables |
| **LEFT JOIN** (LEFT OUTER) | **All rows from the left** table, plus matches from the right; NULLs where there's no match |
| **RIGHT JOIN** | All rows from the right table, plus matches from the left |
| **FULL OUTER JOIN** | All rows from both tables, matched where possible |
| **CROSS JOIN** | Every combination of rows (rarely needed) |

Using the example tables:

- INNER JOIN returns transactions 101, 102 and 103 — **104 disappears** because account 4 doesn't exist.
- LEFT JOIN (transactions on the left) returns all four; 104 has NULL account_name.

### Finding orphan records — a classic BA query

```sql
-- Transactions whose account doesn't exist
SELECT t.*
FROM transactions t
LEFT JOIN accounts a ON t.account_id = a.account_id
WHERE a.account_id IS NULL;
```

This **LEFT JOIN … WHERE right-side IS NULL** pattern is how you find missing or unmatched records — it's essentially what a reconciliation does.

### Watch out

- Joining on a non-unique key can **duplicate rows** and inflate totals. Check row counts before and after a join.
- A **self join** joins a table to itself (for example to find duplicate transactions with the same amount and date).

## SQL: CASE, NULLs and CTEs

> **In short:** CASE adds if-then logic, COALESCE handles blanks, and CTEs make long queries readable.

### CASE

```sql
SELECT txn_id,
       CASE
         WHEN CURRENT_DATE - value_date > 60 THEN '60+ days'
         WHEN CURRENT_DATE - value_date > 30 THEN '31-60 days'
         ELSE '0-30 days'
       END AS age_bucket
FROM transactions
WHERE status = 'UNMATCHED';
```

(Date arithmetic syntax varies by database — for example `DATEDIFF` in SQL Server — but the idea is the same.)

### NULL

**NULL means unknown or missing**, not zero or blank text.

- Test with `IS NULL` / `IS NOT NULL`, never `= NULL`.
- Any arithmetic with NULL gives NULL (`5 + NULL = NULL`).
- `COALESCE(reference, 'NO REF')` returns the first non-null value.
- Aggregates like `SUM` and `AVG` ignore NULLs.

### Common table expressions (CTEs) and subqueries

A **subquery** is a query inside another:

```sql
SELECT * FROM transactions
WHERE amount > (SELECT AVG(amount) FROM transactions);
```

A **CTE** (`WITH`) names a step so complex queries read top to bottom:

```sql
WITH unmatched AS (
  SELECT account_id, COUNT(*) AS cnt
  FROM transactions
  WHERE status = 'UNMATCHED'
  GROUP BY account_id
)
SELECT a.account_name, u.cnt
FROM unmatched u
JOIN accounts a ON a.account_id = u.account_id;
```

### Window functions (bonus)

`ROW_NUMBER()`, `RANK()` and `SUM(...) OVER (PARTITION BY ...)` calculate across related rows without collapsing them — for example, a running total per account. Mentioning them shows SQL confidence, but they're rarely required for BA roles.

## Data quality, mapping and migration

> **In short:** Bad data breaks good systems — check it, define it, map it.

### Data quality dimensions

| Dimension | Question | Example check |
| --- | --- | --- |
| **Accuracy** | Is it correct? | Sample against source documents |
| **Completeness** | Is anything missing? | Count NULL references |
| **Consistency** | Does it agree across systems? | Ledger total = sub-ledger total |
| **Timeliness** | Is it up to date? | File received before cut-off |
| **Validity** | Does it follow the rules? | Currency is a valid ISO code |
| **Uniqueness** | Are there duplicates? | Same amount, date and reference twice |

**Accuracy rate** = correct items ÷ total items × 100. *495 correct out of 500 = 99%.*

### Data mapping

When data moves between systems (an interface or migration), a **data mapping document** (source-to-target mapping) defines, for every target field: the source field, transformation rule, default value and validation.

| Target field | Source | Rule |
| --- | --- | --- |
| value_date | STMT.VAL_DT | Convert DDMMYYYY → YYYY-MM-DD |
| currency | STMT.CCY | Must be a valid ISO 4217 code; reject otherwise |
| reference | STMT.REF1, else STMT.REF2 | Trim spaces; uppercase |

### Data migration steps

Extract → profile and clean → transform (map) → load → **reconcile** (record counts and control totals match between source and target) → sign-off. Rehearse migrations before go-live.

### Data privacy

Handle personal data carefully: use the minimum needed, mask or anonymize it in test environments, and follow laws such as GDPR (EU) or local privacy rules.
