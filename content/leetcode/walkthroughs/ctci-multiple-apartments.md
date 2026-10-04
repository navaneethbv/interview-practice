## Intuition

The requested unit is a tenant, while apartment rentals are individual relationship rows.
Join each rental to its tenant, group those rows by tenant identity, and retain groups with more than one rental.
The uniqueness guarantee for each tenant/apartment pair makes row count equal apartment count.

## Brute force

For every tenant, scan all rental rows and count matches.
This correlated approach can do O(TA) work without a useful index, for T tenants and A rental relationships.
Grouping processes the joined relationships collectively.

## Approach

Join `Tenants t` with `AptTenants a` on `TenantID`.
Group by both `t.TenantID` and `t.TenantName` so each returned row identifies one tenant clearly.
Apply `HAVING COUNT(*) > 1` to the groups.
Select only the tenant ID and name required by the result contract.
Tenants with no rentals disappear in the inner join, which is correct because they cannot qualify.

## Walkthrough

In Example 1, Ana joins with apartment IDs 10 and 11, yielding a group count of two.
Bo joins with apartment 12 only, yielding count one.
Cy joins with apartment IDs 13, 14, and 15, yielding count three.
The HAVING predicate retains Ana and Cy and rejects Bo.
Return `[[1, "Ana"], [3, "Cy"]]`, in either row order.

## Complexity

SQL execution cost depends on SQLite's chosen join and grouping plan and available indexes.
A naive join can require O(TA) comparisons; grouping can require a temporary structure proportional to the matched relationships.
The reference does not promise a constant-space streaming plan.

## Edge cases

An empty relationship table produces no qualifying rows.
Different tenants may share a name and must remain separate groups.
Exactly two apartments are enough to qualify.

## Common mistakes

Grouping only by name can merge different tenants.
Putting an aggregate predicate in WHERE is incorrect because WHERE operates before grouping.

## SQLite notes

SQLite supports this inner join, GROUP BY, and HAVING syntax directly.
`COUNT(*)` is appropriate because every joined row is a real rental and pairs are guaranteed unique.
No ORDER BY is required because output order is unrestricted.
