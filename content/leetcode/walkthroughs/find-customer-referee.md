## Intuition

The requested customers are those whose referee is not customer 2.
A null referee also qualifies because no referee relationship exists.
The WHERE clause must therefore include both a non-2 condition and an explicit null condition.

## Brute force

Filtering rows in application code would require loading every customer and reproducing SQL null semantics manually.
A direct SQL predicate lets SQLite evaluate the rule where the data lives.
The explicit null branch avoids SQL's three-valued comparison surprise.

## Approach

1. Read rows from Customer.
2. Keep a row when referee_id is not 2.
3. Also keep rows where referee_id is null.
4. Select the customer's name.

## Walkthrough

Example 1 has Ana and Bo with null referees, Cy referred by 2, and Dee referred by 1.
Ana and Bo pass the explicit null condition.
Cy is excluded because referee_id equals 2.
Dee passes the not-equal condition, so the result is Ana, Bo, Dee.

## Complexity

With C customer rows, a table scan takes O(C) time without relying on an index.
An index on referee_id may improve the physical plan.
The query uses O(1) logical workspace beyond result and engine-managed storage.

## Edge cases

Null must be tested with IS NULL rather than equals NULL.
A referee id other than 2 qualifies.
A row with referee id 2 is excluded.
The output contains names only.

## Common mistakes

- Writing referee_id <> 2 alone drops null rows.
- Using COALESCE without matching the contract can alter values.
- Selecting the referee name returns the wrong column.
- Comparing text ids to numeric ids can depend on coercion.

## SQLite notes

SQLite evaluates the OR condition with SQL null semantics.
The local reference selects name from Customer.
No language reference accompanies this SQL problem.
