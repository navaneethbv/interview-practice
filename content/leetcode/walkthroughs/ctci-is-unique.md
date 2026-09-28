## Intuition

Uniqueness is a membership question.
As each character arrives, remember the characters already seen and reject the first character that is already present.

## Approach

1. Create an empty set for characters encountered so far.
2. Scan the string from left to right.
3. If the current character is already in the set, return `false`.
4. Otherwise add it to the set.
5. Return `true` after the scan finishes.

## Walkthrough

For `s = "letter"`, the scan records `l`, `e`, and `t`.
The next character is another `t`, so the membership check fails immediately.
The suffix `er` does not need to be inspected because one duplicate is enough to make the answer false.

For `s = "lamp"`, every membership check is false before insertion.
The set ends with four characters, so the answer is true.

## Complexity

- Time: O(n), where `n` is the number of characters.
- Space: O(min(n, u)), where `u` is the number of distinct characters that can appear.

## Edge cases

The empty string and every one-character string are unique.
Whitespace and punctuation count as characters.
Matching is case-sensitive, so `a` and `A` are different.

## Common mistakes

- Sorting the input in place changes the input unnecessarily.
- Treating uppercase and lowercase letters as equal changes the contract.
- Returning true after checking only adjacent characters misses duplicates separated by other characters.

## Language notes

Python's `set` stores the characters directly.
Java uses a `HashSet<Character>` so the two references apply the same membership algorithm.
