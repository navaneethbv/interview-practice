# Top Songs Class With Updates

Implement `TopSongs(k)`, where a song may be registered many times:

- `register_plays(title, plays)` adds `plays` to the song's total, registering it if it is new.
- `top_k()` returns the up to `k` highest-ranked titles by total plays, from highest to lowest.

Songs with more plays rank higher, and songs with equal plays rank by title in alphabetical order.
Java method names are camelCase (`registerPlays`, `topK`).
Construct one instance per test and run the operations in order; `register_plays` produces null.

## Examples

### Example 1

```text
Input: ctor = [2], ops = ["register_plays", "register_plays", "register_plays", "register_plays", "top_k"], args = [["a", 5], ["b", 7], ["a", 4], ["c", 8], []]
Output: [null, null, null, null, ["a", "c"]]
```

### Example 2

```text
Input: ctor = [1], ops = ["register_plays", "register_plays", "top_k"], args = [["x", 1], ["x", 1], []]
Output: [null, null, ["x"]]
```

## Constraints

- `1 <= k < 1,000`
- At most `10^5` operations, and a song's total never exceeds `10^9`.
