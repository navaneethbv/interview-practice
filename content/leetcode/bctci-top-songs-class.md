# Top Songs Class

Implement `TopSongs(k)`:

- `register_plays(title, plays)` records a new song; each title is registered once.
- `top_k()` returns the up to `k` highest-ranked titles, from highest to lowest.

Songs with more plays rank higher, and songs with equal plays rank by title in alphabetical order.
Java method names are camelCase (`registerPlays`, `topK`).
Construct one instance per test and run the operations in order; `register_plays` produces null.

## Examples

### Example 1

```text
Input: ctor = [2], ops = ["register_plays", "register_plays", "register_plays", "top_k"], args = [["Boolean Rhapsody", 193], ["Coding In The Deep", 146], ["Here Comes The Bug", 223], []]
Output: [null, null, null, ["Here Comes The Bug", "Boolean Rhapsody"]]
```

### Example 2

```text
Input: ctor = [3], ops = ["top_k"], args = [[]]
Output: [[]]
```

## Constraints

- `1 <= k < 1,000`
- At most `10^5` operations and `1 <= plays <= 10^9`.
