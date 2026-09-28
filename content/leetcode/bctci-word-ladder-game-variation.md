# Word Ladder Game Variation

Two players build a chain of words from `words`.
Each new word is formed from the previous one by inserting one letter or deleting one letter, without reordering the others.
The first move may be either kind, and after that insertions and deletions must alternate.
No word may appear twice in the chain.
Return whether a chain can start at `word1` and end at `word2`.

## Examples

### Example 1

```text
Input: word1 = "leap", word2 = "hop", words = ["fare", "hug", "car", "vibes", "once", "sop", "far", "ounce", "slap", "sap", "cart", "hung", "art", "shop", "fart", "lap", "soap", "are", "hop", "care", "leap", "bounce", "beyond", "cracking"]
Output: true
Explanation: leap, lap, slap, sap, soap, sop, shop, hop.
```

### Example 2

```text
Input: word1 = "bounce", word2 = "once", words = ["fare", "hug", "car", "vibes", "once", "sop", "far", "ounce", "slap", "sap", "cart", "hung", "art", "shop", "fart", "lap", "soap", "are", "hop", "care", "leap", "bounce", "beyond", "cracking"]
Output: false
Explanation: bounce, ounce, once would delete twice in a row.
```

## Constraints

- `1 <= words.length <= 1,000` and each word has 1 to 30 lowercase letters.
- `word1` and `word2` are different words from `words`.
