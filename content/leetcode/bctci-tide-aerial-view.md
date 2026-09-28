# Tide Aerial View

`pictures` is a time-ordered list of aerial photos of the same `n x n` region, each given as `n` strings of `0` and `1`.
A `1` is under water and a `0` is above water.
In every row the `1`s come before the `0`s, flooded cells stay flooded, and no two pictures are identical.
Return the index of the picture whose flooded and dry cell counts are closest to equal; break ties by the earlier picture.

## Examples

### Example 1

```text
Input: pictures = [["000", "000", "000"], ["100", "000", "100"], ["110", "000", "100"], ["110", "111", "100"], ["111", "111", "110"]]
Output: 2
Explanation: Pictures 2 and 3 are equally close to half flooded; 2 is earlier.
```

### Example 2

```text
Input: pictures = [["11", "11"]]
Output: 0
```

## Constraints

- `1 <= pictures.length <= 500`
- `1 <= n <= 500`
