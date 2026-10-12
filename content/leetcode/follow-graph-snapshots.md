# Follow Graph with Snapshots

Implement a directed follow graph.

- `follow(user, target)` adds an edge. Ignore duplicate edges and self-follows.
- `unfollow(user, target)` removes an edge if it exists.
- `snapshot()` saves an immutable view and returns sequential IDs beginning at 0.
- `following(user, snapshotId)` returns sorted followed user IDs in that snapshot. Use `-1` for the live graph.
- `recommend(user)` returns sorted distinct users reachable by exactly two live follow edges, excluding the user and anyone already followed.

Unknown users have no edges. Snapshot queries must remain unchanged by later mutations. Void methods return `null`.

## Constraints

- Up to 1,000 operations, including at most 100 snapshots; up to 1,000 live edges.
- User IDs are integers in `[0, 10^6]`; queried snapshots always exist, or the ID is `-1`.

## Examples

### Example 1

`follow(1,2)`, `snapshot()`, `unfollow(1,2)`, `following(1,0)`, `following(1,-1)` return `[null,0,null,[2],[]]`.

### Example 2

After `follow(1,2)`, `follow(2,3)`, `follow(2,1)`, `recommend(1)` returns `[3]`.

## Follow-up

Replace full snapshot copies with persistent or versioned adjacency structures.

## Source and scope

Original practice contract based on the public topic reported at [Hello Interview](https://www.hellointerview.com/community/questions/follow-graph-recommendations/cmobtcld30s420fadjyp8zgv3), observed October 12, 2026. API choices and test cases are authored for this site; this is not a reproduction of the source question or a claim that every follow-up is covered.
