# Word Frequencies

Build a lookup over the words of a book so that repeated frequency queries are fast.
Words compare case-insensitively.

- `WordFrequencies(book)` receives the book as an array of words.
- `getFrequency(word)` returns how many times `word` occurs in the book, ignoring case.

Construct one instance per test, then execute the listed operations in order.

## Examples

### Example 1

```text
Input: ctor = [["The", "cat", "saw", "the", "dog"]], ops = ["getFrequency", "getFrequency", "getFrequency"], args = [["the"], ["DOG"], ["bird"]]
Output: [2, 1, 0]
```

### Example 2

```text
Input: ctor = [[]], ops = ["getFrequency"], args = [["a"]]
Output: [0]
```

## Constraints

- `0 <= book.length <= 100,000`
- Words and queries contain English letters only.
- At most 10,000 queries.
