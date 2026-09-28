# Sort By Publication Year

Each book is `[title, author, pageCount, genre, year]`, with every field given as a string.
Return the books sorted by publication year, keeping books from the same year in their original order.
Years are between 1000 and 2025, so a linear-time counting sort is possible.

## Examples

### Example 1

```text
Input: books = [["Shadow", "E. Grey", "350", "Sci-Fi", "2020"], ["Whispers", "L. Hart", "280", "Romance", "2018"], ["Echoes", "M. Vance", "420", "Fantasy", "2018"]]
Output: [["Whispers", "L. Hart", "280", "Romance", "2018"], ["Echoes", "M. Vance", "420", "Fantasy", "2018"], ["Shadow", "E. Grey", "350", "Sci-Fi", "2020"]]
```

### Example 2

```text
Input: books = []
Output: []
```

## Constraints

- `0 <= books.length <= 10^5`
- `1000 <= year <= 2025`
