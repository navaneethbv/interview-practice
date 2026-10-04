## Intuition

Each sentence position independently chooses among its listed synonyms, or keeps its original word when no entry exists.
The complete result is the Cartesian product of those per-position choices.

## Brute force

Repeatedly copying and expanding whole partial sentences works but duplicates prefixes many times.
Backtracking keeps one mutable selection and copies only when a complete sentence is ready.

## Approach

Build `options` from each entry's first word to its remaining synonyms.
Split the input sentence into words.
At position index, iterate its available choices, append one to chosen, recurse to the next position, then pop it.
At the end, join chosen with single spaces and append the sentence to results.
Every sequence of per-position choices is visited once, and no unrelated synonym substitutions are introduced.
Words with entries must use one of the supplied replacements; the original word is not an extra implicit choice.

## Walkthrough

```text
Input: sentence = "one does not simply walk into mordor", synonyms = [["walk", "stroll", "hike", "wander"], ["simply", "just", "merely"]]
Output: 6 sentences such as "one does not just stroll into mordor"
```

Example 1 gives simply two options, just and merely, and walk three options, stroll, hike, and wander.
The unchanged prefix is `one does not` and the unchanged suffix is `into mordor`.
Choosing just and stroll yields the example sentence.
The other combinations pair each of the two adverbs with each of the three verbs, producing six sentences in total.

## Complexity

Let R be the product of option counts across sentence positions and L the maximum rendered sentence length.
Generating and joining outputs takes O(RL) time, plus input parsing and dictionary construction.
Output storage is O(RL); recursion and chosen use O(W) space for W words, excluding stored options.

## Edge cases

A word without an entry stays unchanged.
Repeated positions choose independently.
One synonym per replaceable word produces one sentence.

## Common mistakes

Do not take a transitive synonym closure; entries provide direct replacement options only.
Undo the chosen word before exploring its sibling alternatives.

## Language notes

Python uses list append/pop and join.
Java uses an ArrayList selection and String.join, returning complete strings whose contents are unaffected by later backtracking.
