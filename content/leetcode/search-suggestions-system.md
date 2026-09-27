# Search Suggestions System

After each character of searchWord is typed, suggest up to three product names beginning with the prefix typed so far.
Choose the lexicographically smallest matching names and list them in that order.
Return one suggestion list for each prefix, including empty lists when nothing matches.

## Examples

### Example 1

```text
Input: products = ["cat", "car", "cart", "dog"], searchWord = "car"
Output: [["car", "cart", "cat"], ["car", "cart", "cat"], ["car", "cart"]]
Explanation: The third prefix excludes cat.
```

### Example 2

```text
Input: products = ["apple"], searchWord = "b"
Output: [[]]
Explanation: No name starts with b.
```

## Constraints

- 1 <= products.length <= 1000.
- Product names are distinct lowercase strings.
- 1 <= searchWord.length <= 1000.
- The total length of product names is at most 20000.
