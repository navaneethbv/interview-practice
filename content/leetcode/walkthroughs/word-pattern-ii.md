## Intuition
Each pattern symbol must map to one nonempty substring, and different symbols must map to different substrings.
Backtracking tries a candidate only while maintaining both directions of that one to one mapping.

## Brute force
A naive method enumerates every partition of `s` into as many nonempty pieces as the pattern length.
There are O(2^(|s|-1)) partitions before checking symbol consistency.
Copying candidate substrings adds O(|s|) work per attempted piece in Python and Java.

## Approach
1. Track the current pattern index and string index.
2. Reuse a symbol's mapped word only when it matches at the current string position.
3. For an unmapped symbol, try each nonempty ending that is not already used.
4. Undo both maps when a recursive branch fails.
5. Reject states whose remaining text is shorter than the remaining pattern.

## Walkthrough
Example 1 uses pattern `abab` and string `redblueredblue`.
At pattern index 0, the first successful branch maps `a` to `r` and advances the text index to 1.
At index 1, it maps `b` to `edblue` and advances to 7.
The next `a` matches `r` at index 7 and advances to 8.
The next `b` matches `edblue` at index 8 and reaches the end of the text.
The terminal state has consumed both inputs, so the method returns `true`.

## Complexity
Let m be the pattern length and n be the string length.
The search can explore O(n^m) assignments in the worst case.
Substring creation and matching can add O(n) per branch, so the worst case is O(n^(m+1)) time.
The mapping, used set, and recursion path use O(m+n) space including stored substring characters.

## Edge cases
An empty pattern succeeds only for an empty string.
A repeated symbol must reuse exactly the same substring.
Two symbols cannot share a substring even when their positions would match.

## Common mistakes
Allowing an empty candidate creates invalid mappings.
Forgetting to remove a failed candidate contaminates later branches.
Checking only the forward map permits two symbols to share one word.

## Language notes
Python slicing creates a new string for each candidate.
Java `substring` also creates a candidate string, and `startsWith` checks the existing text directly.
