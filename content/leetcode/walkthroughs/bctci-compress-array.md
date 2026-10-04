## Intuition

After fully compressing a prefix, the only new equal adjacency can occur where the next value meets the prefix's final value.
A stack makes that boundary directly accessible and supports repeated merges cascading leftward.

## Brute force

Repeatedly scanning from the beginning for the first equal pair and shifting the array can take quadratic time.
The stack avoids revisiting settled internal positions.

## Approach

For each input value, compare it with the stack top.
While they are equal, pop the top and add it to the current value.
The newly doubled value may now equal the next stack top, so keep checking.
Push the value once no further merge is possible.
The stack is always the fully compressed form of the processed prefix.
Completing each cascade before reading another input value preserves the required first-pair order.

## Walkthrough

```text
Input: arr = [8, 4, 2, 2, 2, 4]
Output: [16, 2, 4]
Explanation: [8, 4, 2, 2, 2, 4] becomes [8, 4, 4, 2, 4], then [8, 8, 2, 4], then [16, 2, 4].
```

Example 1 first builds stack `[8, 4, 2]`.
The next 2 merges with the top 2 to become 4.
That 4 merges with the earlier 4 to become 8, which merges with the earlier 8 to become 16.
The remaining input values 2 and 4 append without equality.
The final stack is `[16, 2, 4]`.

## Complexity

Each input value creates at most one push, and each merge removes a stored entry.
Thus total time is O(n), despite the nested loop.
The stack and returned result require O(n) space in the worst case.

## Edge cases

An empty array stays empty.
Zeros repeatedly merge to zero, still reducing entry count.
A cascade can consume the entire current stack.

## Common mistakes

A single if statement misses cascading merges.
Merging all equal values globally would incorrectly combine nonadjacent occurrences.

## Language notes

Python lists support append and pop at the end.
Java uses a `Deque<Long>` and reconstructs output backward because pushing places the newest compressed value at the deque front.
