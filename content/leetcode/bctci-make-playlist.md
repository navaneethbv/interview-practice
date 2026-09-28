# Make Playlist

Each entry of `songs` is `[title, artist]`, and titles are distinct.
Order all the titles so that no two consecutive songs have the same artist, and return the order.
Any valid order is accepted; return an empty list if none exists.

## Examples

### Example 1

```text
Input: songs = [["a", "X"], ["b", "X"], ["c", "Y"]]
Output: ["a", "c", "b"]
```

### Example 2

```text
Input: songs = [["a", "X"], ["b", "X"]]
Output: []
```

## Constraints

- `0 <= songs.length <= 10^5`
