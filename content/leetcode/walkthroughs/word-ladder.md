## Intuition

Treat each valid word as a graph vertex, with an edge between words that differ at one position.
Breadth first search explores transformations by increasing sequence length, so the first endWord found is shortest.
Generating one-letter mutations avoids comparing every pair of words.

## Brute force

Comparing every pair of W words to build the one-letter graph costs O(W² × L) time for word length L, followed by a breadth first search.
The current search generates 26 replacements at each character of each discovered word, avoiding the all-pairs comparison.
## Approach

1. Put wordList in remaining_words and return zero if endWord is absent.
2. Enqueue beginWord with distance one and remove it from the remaining set.
3. For each dequeued word, replace each character with every lowercase letter.
4. When a candidate is still in remaining_words, remove it and enqueue it with distance plus one.
5. Return when the candidate equals endWord, or zero if the queue empties.

Removing a word when it is enqueued makes each word one BFS vertex and prevents repeated work.
The length counts words in the sequence, so beginWord starts at one.

## Walkthrough

Example 1 uses beginWord = hit and endWord = cog.

| distance | queue layer | newly accepted word |
| ---: | --- | --- |
| 1 | hit | hot |
| 2 | hot | dot, lot |
| 3 | dot, lot | dog, log |
| 4 | dog, log | cog is found while processing dog |

The first sequence is hit, hot, dot, dog, cog, so the answer is 5.

## Complexity

Let W be the number of dictionary words and L be word length.
At most W dictionary words plus the starting word can be processed.
The reference tries 26 letters at each of L positions and constructs and hashes strings of length L.
With character-copy cost included, time is O((W + 1) × 26 × L²).
The set initially stores all W dictionary words and the queue stores discovered words, giving O((W + 1) × L) space including generated candidate strings.

## Edge cases

If endWord is not listed, no transformation is allowed and the answer is zero.
The statement guarantees different start and end words; the reference does not add a separate equal-endpoint shortcut.
Words are removed when first discovered, even if another path reaches them later.
The algorithm assumes all words have the same length as beginWord.

## Common mistakes

- Returning the number of edges instead of the number of words gives one too few.
- Marking words visited only when dequeued allows duplicate queue entries.
- Changing two positions at once creates invalid edges.
- Forgetting to require endWord in the dictionary accepts an unavailable target.

## Language notes

Python creates candidates with slicing, so each mutation copies character data.
Java mutates one char array and constructs a String for each candidate.
Both remove accepted words from remaining_words before adding them to the queue.
