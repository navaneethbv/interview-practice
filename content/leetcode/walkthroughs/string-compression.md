## Intuition

Each consecutive run can be replaced by one character and the decimal digits of its length.
A read pointer finds the end of a run, while a write pointer fills the compressed prefix.
Because writing never needs data beyond the current read position, the original array can be reused.

## Brute force

Building a new list for every run is straightforward and takes O(n) output space.
Repeatedly joining strings can also introduce avoidable copying.
The two pointer method writes directly into chars and satisfies the constant extra space requirement.

## Approach

1. Set read_index and write_index to zero.
2. Find run_end while the current character remains equal.
3. Write the run character at write_index.
4. If the run has length greater than one, write each count digit separately.
5. Move read_index to run_end and repeat until all input characters are consumed.
6. Return write_index as the compressed prefix length.

## Walkthrough

Example 1 uses chars = [a, a, b, c, c, c].

| run | length | written prefix |
| --- | ---: | --- |
| a,a | 2 | [a,2] |
| b | 1 | [a,2,b] |
| c,c,c | 3 | [a,2,b,c,3] |

The returned length is 5, so the displayed prefix is [a,2,b,c,3].

## Complexity

Let n be the original character count.
The read pointer visits each input character and the write loop emits each compressed digit, so time is O(n).
The decimal count string uses O(log n) temporary characters in the largest run; the remaining traversal state is O(1).
The compressed prefix reuses the caller-owned array and needs no separate output allocation.
A count such as 12 writes two separate characters.

## Edge cases

A single character is written without a count.
A run of exactly two writes the character and digit 2.
A run of length 10 or more writes every decimal digit separately.
Runs containing digits or symbols are treated like any other character.

## Common mistakes

- Writing a count of one changes the required format.
- Treating 12 as one array entry violates the character contract.
- Advancing read_index only one position repeats the same run.
- Returning the input length instead of write_index exposes stale suffix entries.

## Language notes

Python iterates over the string form of a run length and assigns each digit.
Java creates a temporary count String and copies its characters into the array.
That temporary count is O(log n) space, which is bounded by the input and does not change the intended constant workspace model for the fixed character buffer.
