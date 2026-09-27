## Intuition

A zero ends the current run of consecutive ones.
A single pass can therefore maintain the length of the current run and the largest run seen so far.
No positions need to be revisited after a zero resets the current count.

## Brute force

Checking every starting index and extending through later ones can take O(n²) time in an array of ones.
The running count approach records the same information while examining each value once.

## Approach

1. Initialize best_length and current_length to zero.
2. For each value, increment current_length when it is one.
3. Update best_length after extending a run.
4. Reset current_length to zero when the value is zero.
5. Return best_length.

## Walkthrough

Example 1 uses nums = [1,1,0,1,1,1].

| value | current_length | best_length |
| ---: | ---: | ---: |
| 1 | 1 | 1 |
| 1 | 2 | 2 |
| 0 | 0 | 2 |
| 1 | 1 | 2 |
| 1 | 2 | 2 |
| 1 | 3 | 3 |

The final three ones produce the answer 3.

## Complexity

Let n be the array length.
Each value is processed once, so time is O(n).
Only two counters are stored, giving O(1) auxiliary space.

## Edge cases

An all-zero array returns zero.
An all-one array returns its full length.
A single one returns one.
Zeros between runs reset only current_length and do not erase best_length.

## Common mistakes

- Failing to reset the current run after zero joins separate runs.
- Returning current_length ignores an earlier longer run.
- Counting noncontiguous ones violates the contiguous requirement.
- Allocating a list of run lengths is unnecessary.

## Language notes

Python uses integer variables and explicit branches for the reset.
Java uses int counters and Math.max while preserving the same state transitions.
The input values are binary, so no other branch is needed.
