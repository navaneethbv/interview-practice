## Intuition

The update target is every request attached to an apartment in building 11.
Building identity is stored on apartments, so first derive the qualifying apartment IDs and use that set to restrict the request update.
Requests for all other buildings must retain their current status.

## Brute force

For each request, inspect apartments until finding its apartment and then test the building ID.
This procedural approach repeats lookups and would require application-side mutation logic instead of one database statement.

## Approach

The subquery selects `AptID` from `Apartments` where `BuildingID = 11`.
The outer UPDATE sets `Requests.Status` to `Closed` only when its `AptID` belongs to that subquery result.
The membership test avoids confusing a building ID with an apartment ID.
Already closed matching requests remain closed, so applying the statement again has the same final state.
The harness reads all requests afterward to verify both changed and untouched rows.

## Walkthrough

Example 1 has apartment 1 in building 11 and apartment 2 in building 12.
The subquery therefore returns only apartment ID 1.
Request 10 changes from Open to Closed because it belongs to apartment 1.
Request 11 remains Open because it belongs to apartment 2.
Request 12 was already Closed and remains unchanged.
The final rows are `[[10, "Closed", 1], [11, "Open", 2], [12, "Closed", 1]]`.

## Complexity

Execution cost depends on SQLite's membership lookup and scan plan.
The database must identify qualifying apartments and inspect or locate matching requests.
Without suitable indexing, scans and a temporary membership structure may be required; no fixed constant-space claim follows from the SQL text alone.

## Edge cases

If building 11 has no apartments, no requests change.
An empty Requests table remains empty.
All matching requests qualify regardless of their previous status.

## Common mistakes

Omitting WHERE closes requests in every building.
Testing `Requests.AptID = 11` targets an apartment, not the required building.

## SQLite notes

This is SQLite UPDATE syntax with a noncorrelated IN subquery.
The statement does not return selected rows directly; the spec's separate result query inspects `RequestID`, `Status`, and `AptID` after mutation.
