## Intuition

The inputs are decimal text, so arithmetic operators cannot be used to convert the whole values.
Adding from right to left follows the same carry rule as hand addition.
A result digit is written for each aligned pair, and a final carry becomes a leading digit.

## Brute force

Converting both strings to machine integers and adding them is short, but it violates the arbitrary-length string contract.
A digit-by-digit scan takes O(max(m, n)) time and avoids integer conversion limits.
Storing every result digit is necessary because the returned value itself can be that long.

## Approach

1. Point first_index and second_index at the last digits.
2. Read a digit from each string when its index is valid.
3. Add both digits and carry, then append the total's ones digit.
4. Divide the total by ten to obtain the next carry.
5. Continue until both inputs and carry are exhausted.
6. Reverse the collected digits and return the string.

## Walkthrough

Example 1 adds num1 = "95" and num2 = "17".

| digits processed | total | output collected backward | carry |
| --- | ---: | --- | ---: |
| 5 + 7 | 12 | 2 | 1 |
| 9 + 1 + 1 | 11 | 21 | 1 |
| carry only | 1 | 211 | 0 |

Reversing the collected digits gives "112".

## Complexity

Let L be the larger input length.
Each input digit is read once, so time is O(L).
The digit buffer and returned string use O(L) space.
No intermediate integer is proportional to the numeric value.

## Edge cases

Inputs of different lengths use zero for missing leading positions.
A carry after the most significant digits must be retained.
Adding zero leaves the other decimal string unchanged.
Very long inputs remain safe because the algorithm handles one digit at a time.

## Common mistakes

- Appending the carry before the aligned digits reverses the result incorrectly.
- Forgetting a final carry loses answers such as 999 plus 1.
- Using integer parsing overflows or rejects long inputs.
- Advancing an index before reading its current digit skips a position.

## Language notes

Python stores digit characters in a list and uses divmod to obtain carry and digit.
Java uses StringBuilder and reverses it after appending least significant digits.
Java arithmetic stays within a small per-digit total, regardless of input length.
