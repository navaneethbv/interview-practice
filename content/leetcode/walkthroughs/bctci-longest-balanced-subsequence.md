## Intuition

A closing parenthesis should pair with the nearest unmatched earlier opener whenever one exists.
Mark both positions of every successful pair and discard all unpaired positions afterward, preserving the original order of the remaining characters.

## Brute force

Trying all subsets of positions takes exponential time.
Keeping only counts could find a length but would lose the required nearest-opener tie rule for the returned string.

## Approach

Maintain a stack of opener indices and a boolean `keep` array.
Push each opening parenthesis.
For a closing parenthesis with a nonempty stack, pop the nearest opener and mark both positions true.
Unmatched closers and leftover openers stay false.
Build the result by scanning the original string and retaining marked characters.
Greedily matching an available opener cannot reduce the number of future matches: the current closer cannot match a later opener, while the chosen pair uses one available opener exactly once.

## Walkthrough

```text
Input: s = "))(())(()"
Output: "(())()"
```

Example 1 begins with two unmatched closers, which are discarded.
The middle `(())` forms two nested pairs and is fully retained.
In the final `(()`, the closer matches the nearer of the two openers, leaving the earlier one unmatched.
Deleting that unmatched opener gives another `()`.
The combined result is `(())()`.

## Complexity

Each character is pushed, popped, or inspected a constant number of times, giving O(n) time.
The stack, keep flags, and returned string use O(n) space.

## Edge cases

An empty or one-type-only string returns empty output.
An already-balanced string remains unchanged.
Leading closers never become matchable later.

## Common mistakes

Using the oldest unmatched opener changes the prescribed canonical result.
Do not output pairs in discovery order, which can scramble nested structure.

## Language notes

Python joins marked original characters.
Java appends them with StringBuilder; both separate matching from final ordered reconstruction.
