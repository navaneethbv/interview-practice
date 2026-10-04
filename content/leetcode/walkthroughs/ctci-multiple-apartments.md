## Intuition

The apartment relation has one row for every tenant and apartment pair.
A tenant qualifies exactly when their relation rows form a group with count greater than one.
After identifying those tenant IDs, joining to `Tenants` supplies each tenant's name without grouping by a possibly duplicated name.

## Approach

Group `AptTenants` by `TenantID` and keep groups whose `COUNT(*)` exceeds one.
Join that result to `Tenants` on `TenantID`.
Select `TenantID` and `TenantName`, leaving the result unordered as permitted by the spec.
Counting rows is sufficient because the statement guarantees that each tenant and apartment pair appears once.

## Walkthrough

For Example 1, grouping the apartment rows gives counts two for tenant one, one for tenant two, and three for tenant three.
The `HAVING` condition retains tenant IDs one and three.
Joining them to `Tenants` returns `[1, "Ana"]` and `[3, "Cy"]`.
For Example 2, tenant one has only one relation row, so its group is filtered out and the result is empty.

## Complexity

SQLite scans the apartment relation and groups its rows, then joins the qualifying IDs to the tenant table.
The query is `O(A + T)` in the usual indexed or hash-style analysis, where `A` is apartment rows and `T` is tenant rows.
The grouping state uses `O(U)` space for the distinct tenant IDs represented in `AptTenants`.

## Edge cases

An empty `AptTenants` table creates no groups and returns no tenants.
Two tenants may share the same name, so grouping or joining by `TenantName` would merge unrelated people.
The threshold is strictly greater than one, so exactly one apartment does not qualify.

## Common mistakes

Using `WHERE COUNT(*) > 1` is invalid because aggregate filters belong in `HAVING`.
Selecting only from `AptTenants` omits the required tenant name.
Adding an `ORDER BY` is unnecessary because the spec compares rows without order.

## SQLite notes

SQLite supports the same `GROUP BY`, `HAVING`, and inner `JOIN` forms used here.
The local query source is `content/leetcode/ctci-multiple-apartments.sql`, and this SQL problem intentionally has no Python or Java reference.
The result columns must remain exactly `TenantID` and `TenantName` so the harness can compare the selected rows.
