## Intuition

Every occurrence of a splits the string into independent runs that contain no forbidden letter.
While scanning one run, its current length equals the number of valid substrings ending at the current position.

## Brute force

Enumerating every substring and searching it for a takes cubic time in the worst case.
A running length summarizes all suffixes ending at each position without constructing them.

## Approach

Initialize `run` and `answer` to zero.
For each letter, reset run to zero if it is a; otherwise increment run.
Add run to answer.
If the current allowed suffix has length t, the valid substrings ending here have lengths 1 through t.
Longer suffixes would cross the preceding a, while all shorter ones remain inside the run.
Each positional substring has one ending index, so summing these contributions counts it exactly once.

## Walkthrough

```text
Input: ["bbac"]
Output: 4
```

Example 1 is `bbac`.
The first b gives run 1 and contributes one substring.
The second b gives run 2 and contributes its singleton plus `bb`.
The a resets run to zero and contributes nothing.
The final c starts a new run of length 1 and contributes one.
The sum is 1 + 2 + 0 + 1 = 4.

## Complexity

The string is scanned once, so time is O(n).
Only two counters are maintained, giving O(1) extra space.
The number of substrings can grow quadratically with n.

## Edge cases

An empty string returns zero.
A string consisting only of a returns zero.
A string without a has n(n + 1)/2 valid positional substrings.

## Common mistakes

Repeated identical substring text at different positions must count separately.
Failing to reset run lets intervals cross a forbidden letter.

## Language notes

Python integers naturally hold the count.
Java uses a long answer while run fits in int under the stated string-length bound.
