## Intuition

A subsequence keeps relative order while allowing characters from t to be skipped.
The next unmatched character of s is the only character that matters.
Scanning t once greedily consumes that next character whenever it appears.

## Brute force

A recursive choice could include or skip every character of t.
That creates exponential branches.
The greedy scan never needs to revisit a skipped character because later matches cannot move backward.

## Approach

1. Set sourceIndex to the first character of s.
2. Scan characters of t from left to right.
3. Advance sourceIndex when the current character matches s[sourceIndex].
4. Return true when all characters of s have been consumed.
5. Otherwise return false after t ends.

## Walkthrough

Example 1 checks s abc against t ahbgdc.
The scan matches a, skips h, then matches b, skips g, and matches c.
sourceIndex reaches the length of s.
The method returns true.

## Complexity

Let m and n be the lengths of s and t.
The scan takes O(n) time and uses O(1) auxiliary space.
The returned boolean requires no output collection.
The short-circuit condition avoids indexing s after all characters match.

## Edge cases

An empty s is a subsequence of every t.
A nonempty s with empty t returns false.
Repeated characters must be matched in order.
A matching character before the current source position cannot be reused.

## Common mistakes

- Restarting the source scan after each match allows order violations.
- Requiring adjacent characters confuses subsequences with substrings.
- Returning true after one matching character ignores the rest of s.
- Converting strings to sets loses order and multiplicity.

## Language notes

Python iterates directly over t.
Java uses charAt and avoids allocating a character array.
Both keep one source pointer.
