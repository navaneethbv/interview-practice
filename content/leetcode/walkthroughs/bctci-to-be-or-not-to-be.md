## Intuition

Each word occurrence makes an independent keep-or-delete decision.
A recursion over positions enumerates those decisions while preserving the order of all words that are kept.

## Brute force

The number of outputs is exponential by definition, so an exponential enumeration is necessary.
Generating arbitrary word permutations would produce invalid orders and far more irrelevant candidates.

## Approach

Split the sentence into words and call `choose` with an empty kept list.
At each index, first recurse while skipping the word.
Then append that word, recurse while keeping it, and pop it afterward.
At the end, join kept with single spaces and append the resulting string.
Every decision sequence reaches exactly one leaf, and every leaf represents one allowed selection of original positions.
Repeated words can create identical strings from different decisions, which must remain duplicated in results.

## Walkthrough

```text
Input: sentence = "I love dogs"
Output: ["", "I", "love", "dogs", "I love", "I dogs", "love dogs", "I love dogs"]
```

Example 1 has three words, so there are eight decision sequences.
Skipping every word produces the empty string.
Keeping just one gives I, love, or dogs; keeping two gives I love, I dogs, or love dogs.
Keeping all three produces I love dogs.
The reference's skip-first recursion may emit them in a different order than the statement, which is accepted.

## Complexity

For W words and sentence character length L, there are 2 to the power W outputs.
Joining them gives O((L + W + 1) times 2 to the power W) time and output space in the worst case.
The recursion stack and kept list use O(W) additional working space.

## Edge cases

An empty sentence has one choice, producing a list containing the empty string.
Duplicate word occurrences still represent distinct choices.
A one-word sentence yields empty and unchanged sentences.

## Common mistakes

Do not store outputs in a set.
Do not forget to remove the kept word after its recursive branch.

## Language notes

Python split naturally produces no words for empty input.
Java handles the empty string explicitly before calling split, preserving the required single empty result.
