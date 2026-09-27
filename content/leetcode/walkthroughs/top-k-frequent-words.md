## Intuition

Frequency determines the primary order, and alphabetical order breaks ties.
Count each word, sort every distinct word with the pair `(negative frequency, word)`, and keep the first `k` entries.
The reference intentionally sorts all unique words, so its complexity depends on the number of distinct words rather than using a heap.

## Brute force

For each word, counting its occurrences by scanning the entire input takes O(n²) time.
Sorting the distinct words after one counting pass reduces the repeated counting work and gives the exact tie ordering.

## Approach

1. Build `counts` with one frequency update per input word.
2. Sort the distinct keys by descending `counts[word]` and ascending word text.
3. Return the first `k` entries from `ordered_words`.

## Walkthrough

Example 1 has `words = ["i", "love", "i", "code", "love"]` and `k = 2`.

| word | frequency | sorted position |
| --- | ---: | ---: |
| `i` | 2 | 0 |
| `love` | 2 | 1 |
| `code` | 1 | 2 |

The two frequency-2 words are ordered alphabetically, so the result is `["i", "love"]`.

## Complexity

- Time: O(n + U log U), where n is input length and U is the number of distinct words, plus comparison cost for word strings.
- Space: O(U), for the frequency map, sorted key list, and returned list references.

## Edge cases

When `k` is one, only the highest-ranked word is returned.
Words with equal frequencies use lexical ordering, including words with different lengths.
If every word is distinct, U equals n and the full sort is used.
The input contract guarantees `k` does not exceed the number of distinct words.

## Common mistakes

- Sorting by frequency alone makes equal-frequency output nondeterministic.
- Sorting words alphabetically before counting does not establish the primary frequency order.
- Claiming heap complexity does not match this sort-all implementation.

## Language notes

Python's `Counter` and `sorted` express the frequency and tie-key directly.
Java stores counts in a `HashMap`, sorts a key list, and uses `compareWords` to keep the comparator readable.
Both references return strings without mutating the input array.
