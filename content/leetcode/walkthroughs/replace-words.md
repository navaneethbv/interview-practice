## Intuition

A replacement can only be a prefix of the original word, and the shortest valid prefix is the first one found while increasing the prefix length.
Putting dictionary roots in a set makes each prefix check constant average time.

## Brute force

Comparing every sentence word with every dictionary root costs `O(words * dictionary * root_length)` and repeatedly scans roots that cannot match.
Prefix generation with a set avoids the dictionary-wide comparison.

## Approach

1. Put `dictionary` into `roots` for membership checks.
2. Split the sentence into words and inspect each word's prefixes from length 1 upward.
3. Replace the word at the first prefix contained in `roots`, or keep it unchanged.
4. Join all chosen words with single spaces.

## Walkthrough

For Example 1, the roots are `cat` and `bat`, and the words are `the`, `cattle`, `met`, and `bats`.
`the` has no matching prefix and stays unchanged.
`cattle` reaches `cat` at length 3, so it becomes `cat`.
`met` stays unchanged, and `bats` reaches `bat`, giving `"the cat met bat"`.

## Complexity

If the sentence has words of lengths `l_i`, prefix slicing and hashing take `O(sum(l_i^2))` average time in Python, plus `O(D)` root storage work.
The output list or builder and split words use `O(W)` space, where `W` is total sentence length.

## Edge cases

An exact dictionary root is returned when it is the first matching prefix.
If several roots match, scanning by length chooses the shortest regardless of dictionary order.

## Common mistakes

- Testing roots in dictionary order can return a longer root before a shorter one.
- Replacing a word after finding a later prefix can overwrite the shortest match.
- Joining with the original spacing ignores the statement's required single-space output.

## Language notes

Python slicing creates a new prefix string at each length, so the actual work includes those copies.
Java uses `substring` and `StringBuilder`; Java strings are immutable, but the total bounded word length keeps the straightforward approach appropriate.
