## Intuition

Each sentence position is an independent choice between its listed synonyms or its original word.
The complete answer set is therefore a Cartesian product of those per-position choices.
Depth-first backtracking explores one choice at a time while reusing a single partial sentence.

## Approach

Map each entry's first word to the list that follows it.
Split `sentence` into words and recursively process positions from left to right.
At a position with synonyms, append each synonym, recurse, and remove it when returning.
At a position without an entry, append the original word and recurse once.
When every position has been processed, join the selected words and append the completed sentence to `results`.

## Walkthrough

For Example 1, `simply` has three choices and `walk` has three choices, while every other word has one choice.
The recursion first chooses `just`, then tries `stroll`, `hike`, and `wander`, producing three complete sentences.
It backtracks to choose `merely` and repeats the three `walk` choices, yielding six results.
The local judge compares this list without requiring a particular order, so the traversal order can remain the map and input order.

## Complexity

Let `W` be the number of sentence words and `C` the product of the available choices at those positions.
There are `C` output sentences, and constructing each one costs `O(W)`, for `O(CW)` output-sensitive time.
The recursion and chosen path use `O(W)` auxiliary space, excluding the returned `results` list.

## Edge cases

An empty synonym list leaves every sentence word unchanged and produces one result.
Repeated occurrences of the same word are processed independently, so each occurrence can choose a different synonym.
The example with one word returns only synonym choices because an entry replaces the original word rather than adding it as an option.

## Common mistakes

Keeping the original word alongside synonyms would create extra sentences that the contract excludes.
Failing to pop after recursion leaks a previous choice into later branches.
Using a set for results can accidentally discard duplicate sentences when repeated words produce the same text.

## Language notes

Python uses a nested `build` function and mutates `chosen` with append and pop.
Java passes the same mutable `chosen` list through a helper and uses `String.join` at the leaf.
Both references preserve the method name `thesaurusly` and return `List<String>` values as required.
