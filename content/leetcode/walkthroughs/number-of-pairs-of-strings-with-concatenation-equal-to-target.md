## Intuition
The pair is ordered, so `(i, j)` and `(j, i)` are different whenever both work.
The strings must be compared as text, because leading zeroes are part of the input and have no numeric interpretation.
Checking every distinct pair directly mirrors the definition and is easily within the constraints.

## Brute force
The direct nested loop is also the useful baseline here.
For each first index, try every second index and reject the case where the indices are equal.
There are N squared index pairs, and each concatenation and comparison can inspect up to the target length.

## Approach
1. Set a counter to zero.
2. Visit every ordered pair of indices.
3. Skip pairs using the same index.
4. Concatenate the two selected strings and increment the counter when it equals `target`.

## Walkthrough
Example 1 has `nums = ["1", "1", "11"]` and `target = "11"`.
The pair `(0, 1)` concatenates to `"11"`, so the counter becomes 1.
The pair `(1, 0)` also concatenates to `"11"`, so it becomes 2.
Pairs involving index 2 produce `"111"` or `"1111"`, and a self-pair is skipped.
The answer is therefore 2, preserving the fact that equal strings at different positions are separate choices.

## Complexity
There are O(N squared) ordered index pairs.
Each comparison can allocate and inspect a concatenated string of length O(T), so the worst-case time is O(N squared times T).
The loop uses O(T) temporary space for the current concatenation, in addition to language-managed string storage.

## Edge cases
Duplicate strings count independently when their indices differ.
Leading zeroes remain characters, so `"01"` is not replaced by `"1"`.
If no concatenation matches, the counter remains zero.

## Common mistakes
Counting unordered pairs loses one valid direction.
Comparing numeric conversions can destroy leading zeroes and overflow long strings.
Allowing `i == j` incorrectly uses the same array entry twice.

## Language notes
Python's `+` creates a new string for each candidate pair.
Java's string concatenation in the comparison has the same logical behavior and uses the harness-provided standard library.
Both methods return an `int`, which is sufficient for at most 10,000 ordered pairs.
