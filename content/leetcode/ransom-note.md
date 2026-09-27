# Ransom Note

Decide whether `ransomNote` can be assembled using letters from `magazine`.
Each magazine occurrence may be used once; the chosen letters may be rearranged.

## Examples

### Example 1

```text
Input: ransomNote = "aab", magazine = "baa"
Output: true
Explanation: The magazine contains the two a occurrences and one b needed.
```

### Example 2

```text
Input: ransomNote = "aa", magazine = "ab"
Output: false
Explanation: Only one a is available.
```

## Constraints

- 1 <= ransomNote.length, magazine.length <= 100,000
- Both strings contain lowercase English letters.
