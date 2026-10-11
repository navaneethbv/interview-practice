## Requirements

- Update a player's score after each game; show the top 100 and any player's rank and neighbors.
- Global, regional and friends leaderboards; daily, weekly and all-time windows.

Assume 50 million players and 10,000 score updates per second.

## Core data structure

A sorted set keyed by score supports `add`, `rank` and `range` in O(log n).
Redis sorted sets are the common choice: `ZINCRBY board:weekly 50 player:42`, `ZREVRANGE board:weekly 0 99`, `ZREVRANK board:weekly player:42`.

## Architecture

```text
Game servers -> score events -> stream -> Leaderboard updater -> Redis sorted sets (per board and window)
                                       -> durable store (scores table) for rebuilds
API -> Redis for top N, rank, neighbors; friends board computed on read
```

## Deep dives

**Windows.** Keep one sorted set per window key, such as `weekly:2026-41`, and expire old keys.

**Scale beyond one node.** 50 million members fit in memory on one large node, but writes may not.
Shard by score range or by player hash: by hash, top N is a merge of each shard's top N; rank requires summing counts above a score across shards.

**Friends leaderboard.** Fetch the friends' scores (a few hundred) and sort in the API; do not maintain a sorted set per user.

**Ties.** Encode a tie-breaker in the score, for example `score * 2^32 + (MAX_TIME - achieved_at)`, so earlier achievers rank first.

## Follow-up questions

- How do you rebuild after losing Redis? (Replay from the durable scores table or the event stream.)
- How do you prevent cheating? (Validate scores server-side from game events; never accept client-reported totals.)
