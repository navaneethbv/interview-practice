# Friend Requests II: Who Has the Most Friends

An accepted request makes requester and accepter friends. Report the person with the most friends and the count; exactly one person has the most.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `id`, `num`; row order is unrestricted.

## Tables

### RequestAccepted

| Column | SQLite type |
| --- | --- |
| requester_id | INTEGER |
| accepter_id | INTEGER |
| accept_date | TEXT |

## Constraints

- (requester_id, accepter_id) is unique and requester_id differs from accepter_id.

## Examples

### Example 1

```text
Input: {"tables": {"RequestAccepted": [[1, 2, "2016-06-03"], [1, 3, "2016-06-08"], [2, 3, "2016-06-08"], [3, 4, "2016-06-09"]]}}
Output: [[3, 3]]
Explanation: Person 3 is friends with 1, 2 and 4.
```

### Example 2

```text
Input: {"tables": {"RequestAccepted": [[5, 6, "2020-01-01"], [7, 6, "2020-01-02"]]}}
Output: [[6, 2]]
Explanation: Accepting counts the same as requesting.
```
