## Intuition

Reordering makes character positions irrelevant, but multiplicities still matter.
A candidate must contain every original letter occurrence and have exactly one additional character overall.

## Brute force

Sorting the original and candidate strings could compare their multisets but costs O(L log L) per candidate.
A fixed lowercase alphabet allows frequency counting in linear time.

## Approach

The constructor saves the original length and per-letter counts.
A query first rejects any candidate whose length is not original length plus one.
Count the candidate's letters and verify that every original count is covered.
The length difference then guarantees that exactly one extra occurrence remains, regardless of which letter it is.
Python explicitly subtracts the original Counter and checks nonnegative differences summing to one.
Java verifies coverage using its 26-element arrays; the already-checked length makes a separate sum unnecessary.

## Walkthrough

```text
Input: ctor = ["tea"], ops = ["expands_into", "expands_into", "expands_into"], args = [["tea"], ["team"], ["seam"]]
Output: [false, true, false]
```

Example 1 constructs the checker from tea, containing one t, one e, and one a.
Candidate tea has no additional letter and fails the length check.
Candidate team covers all original counts and adds one m, so it succeeds.
Candidate seam has the required length but contains no t, so it fails even though several letters match.

## Complexity

Construction takes O(length of s) time.
Each query takes O(length of s2 + 26), or constant time when rejected by length immediately.
Frequency storage is O(26).
The Java reference additionally allocates temporary character arrays through toCharArray, so its transient space is linear in the processed string length.

## Edge cases

An empty original accepts any one-letter candidate.
An extra occurrence of an existing letter is valid.
Repeated original letters must all remain present.

## Common mistakes

Do not compare only distinct-letter sets.
A substitution plus an insertion is invalid if it removes an original occurrence.

## Language notes

Python Counter subtraction can produce negative counts that must be checked.
Java indexes lowercase letters by subtracting the character a and uses the required expandsInto method name.
