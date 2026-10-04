## Intuition

Every building must appear, including buildings with no apartments or no open requests.
Start from buildings and preserve them through left joins.
Count only matched request identifiers so an unmatched placeholder row contributes zero instead of one.

## Brute force

For each building, scan its apartments and then all requests to count open matches.
Repeated scans can be costly and make zero-count buildings easy to omit accidentally.
A grouped outer join expresses the required preservation explicitly.

## Approach

Left join `Buildings b` to `Apartments a` using `BuildingID`.
Then left join `Requests r` using both matching `AptID` and `r.Status = 'Open'` in the join condition.
Group by the building ID and name.
Select `COUNT(r.RequestID)` as `OpenRequests`.
Putting the status filter in the join ensures buildings survive even when none of their requests satisfies it.
The nullable request side supplies a zero count for those buildings.

## Walkthrough

Example 1 places apartments 10 and 11 in North, and apartment 20 in South.
North has open requests 100 and 102; closed request 101 does not join as an open request.
South's only request, 103, is closed, so its joined request identifier is null.
The grouped counts are two for North and zero for South.
Return `[[1, "North", 2], [2, "South", 0]]`.

## Complexity

Runtime and temporary storage depend on SQLite's join order, indexes, and aggregation plan.
Without useful indexes, repeated relation scans can dominate the work.
Joined rows and grouping may require storage proportional to the participating data; the query itself does not impose a specific execution strategy.

## Edge cases

A building with no apartments still appears with zero.
Several requests for one apartment all count individually when open.
Building names need not serve as unique identities.

## Common mistakes

`COUNT(*)` counts outer-join placeholder rows and can incorrectly return one.
Filtering open status in WHERE removes buildings whose request side is null.

## SQLite notes

SQLite's COUNT expression ignores nulls and returns zero for a group without matching request identifiers.
The explicit alias supplies the required `OpenRequests` result column, and output order is unrestricted.
