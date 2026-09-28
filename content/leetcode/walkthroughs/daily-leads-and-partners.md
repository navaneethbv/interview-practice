## Intuition
The requested counts are distinct leads and distinct partners for each date and make combination.
Grouping by those two columns allows separate `COUNT(DISTINCT ...)` aggregates.

## Brute force
Counting each date-make group with repeated subqueries rescans duplicate rows.
One grouped query computes both distinct counts together.

## Approach
1. Group rows by `date_id` and `make_name`.
2. Count distinct `lead_id` values as `unique_leads`.
3. Count distinct `partner_id` values as `unique_partners`.
4. Return the grouped columns and aliases required by the contract.

## Walkthrough
For Example 1, date `2024-01-01` and make A have lead ids 1,1,2 and partner ids 5,6,6.
The distinct counts are 2 and 2, so the output row is `["2024-01-01","A",2,2]`.
An exact duplicate in Example 2 still contributes only one distinct lead and one distinct partner.

## Complexity
The logical aggregation reads r rows and produces g date-make groups.
Indexes and temporary grouping or sorting structures affect the physical SQLite cost, so the exact plan may scan, sort, or use indexed lookups.
The result occupies O(g) rows.

## Edge cases
Duplicate combinations do not inflate either distinct count.
A lead repeated with several partners still counts once for the group.
A partner repeated with several leads likewise counts once.

The distinct aggregates are independent: one lead paired with several partners contributes once to the lead count, while each partner still contributes separately to the partner count.

## Common mistakes
Use `COUNT(DISTINCT lead_id)` and `COUNT(DISTINCT partner_id)` independently.
Group by both date and make.
Preserve the required output aliases.

## SQLite notes
SQLite supports both distinct aggregate expressions in one grouped SELECT.
No ordering is needed because row order is unrestricted.
