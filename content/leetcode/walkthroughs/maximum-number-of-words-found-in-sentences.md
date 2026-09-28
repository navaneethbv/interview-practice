## Intuition

Under the single-space sentence contract, the number of words is one more than the number of spaces.
Scanning every sentence and retaining the largest count directly matches the requested maximum.

## Brute force

A brute force approach could split every sentence into a list before counting.
That creates temporary word arrays when counting spaces needs only one pass.

## Approach

1. Start `maximum` at zero.
2. For each sentence, compute `sentence.count(" ") + 1`.
3. Update `maximum` and return it after all sentences.

## Walkthrough

For Example 1, `"one two"` has one space and two words.
`"three four five"` has two spaces and three words, which becomes the new maximum.
`"six"` has no spaces and one word, so the answer remains `3`.

## Complexity

The scan takes `O(total sentence characters)` time.
The Python count and Java character loop use `O(1)` extra space beyond the input strings.
The input list itself is not copied, and the method returns only the single maximum count.

## Edge cases

A one-word sentence contains no spaces and contributes one.
The input guarantees no leading or trailing spaces, so the space-count formula is exact.

## Common mistakes

- Returning the number of spaces instead of words is off by one.
- Splitting on arbitrary whitespace ignores the local single-space contract but can also hide malformed input.
- Keeping only the last sentence's count misses the maximum.

## Language notes

Python uses `str.count`, while Java explicitly scans characters because `String` has no direct space-count method.
No integer overflow is possible under the sentence length bound.
