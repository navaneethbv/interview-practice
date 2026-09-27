# The Earliest Moment When Everyone Become Friends

Each log [timestamp,a,b] records when two people become friends.
Friendship is undirected and connectivity through mutual friends also counts as acquaintance.
Return the earliest timestamp at which all n people, numbered 0 through n-1, belong to one connected group, or -1 if that never happens.

## Examples

### Example 1

```text
Input: logs = [[1, 0, 1], [3, 1, 2], [2, 2, 3]], n = 4
Output: 3
Explanation: At time 3 the two previously separate pairs become connected.
```

### Example 2

```text
Input: logs = [[1, 0, 1]], n = 3
Output: -1
Explanation: Person 2 never joins the group.
```

## Constraints

- 2 <= n <= 100
- 1 <= logs.length <= 10,000
- Timestamps are distinct integers from 0 through 10^9.
- Each log joins two different valid person indices.
