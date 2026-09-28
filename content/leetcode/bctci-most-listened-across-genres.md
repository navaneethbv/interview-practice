# Most Listened Across Genres

`titles[g]` and `plays[g]` list the songs of genre `g`, sorted from most to least played; every genre is non-empty and titles are distinct.
Return the `k` most played titles across all genres, from most to least played.
Break ties by the smaller genre index, then by earlier position within the genre.

## Examples

### Example 1

```text
Input: titles = [["Coding In The Deep", "Someone Like GNU", "Hello World"], ["Ring Of Firewalls"], ["Boolean Rhapsody", "Merge Together", "Hey Queue"]], plays = [[123, 99, 98], [217], [184, 119, 102]], k = 5
Output: ["Ring Of Firewalls", "Boolean Rhapsody", "Coding In The Deep", "Merge Together", "Hey Queue"]
```

### Example 2

```text
Input: titles = [["a"]], plays = [[1]], k = 1
Output: ["a"]
```

## Constraints

- `1 <= genres, total songs <= 10^5` and `1 <= k <= total songs`
