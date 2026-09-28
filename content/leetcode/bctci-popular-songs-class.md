# Popular Songs Class

Implement `PopularSongs()`:

- `register_plays(title, plays)` records a new song; each title is registered once.
- `is_popular(title)` returns whether that registered song's plays are strictly greater than the median play count of all registered songs.

For an even number of songs, the median is the average of the two middle counts.
Java method names are camelCase (`registerPlays`, `isPopular`).
Construct one instance per test and run the operations in order; `register_plays` produces null.

## Examples

### Example 1

```text
Input: ops = ["register_plays", "is_popular", "register_plays", "register_plays", "is_popular", "is_popular"], args = [["a", 193], ["a"], ["b", 140], ["c", 132], ["a"], ["b"]]
Output: [null, false, null, null, true, false]
```

### Example 2

```text
Input: ops = ["register_plays", "register_plays", "is_popular", "is_popular"], args = [["x", 1], ["y", 2], ["x"], ["y"]]
Output: [null, null, false, true]
```

## Constraints

- At most `10^5` songs and `1 <= plays <= 10^9`.
