## Intuition

Each term describes consecutive groups in the previous term.
A scan records a group's length and digit, then writes those two pieces into the next term.
Repeating this transformation n minus one times reaches the requested term.

## Brute force

A naive implementation could repeatedly search for each run's boundary from scratch.
That revisits characters and can make one term's construction quadratic.
One left-to-right run scan consumes every character once per generated term.

## Approach

1. Start with the first term, which is the string 1.
2. For each later term, scan the current term from left to right.
3. Extend the run while the digit stays equal.
4. Append the run length followed by its digit.
5. Replace the current term with the built string and return after n terms.

## Walkthrough

Example 1 requests term 4.
Term 1 is 1, and describing it produces 11.
Describing the one repeated digit in 11 produces 21.
Describing the two separate runs in 21 produces one 2 followed by one 1.
The returned term is 1211.

## Complexity

Let L_i be the length of term i.
The time is O(sum of L_i for i from 1 through n), because each term is scanned and rebuilt once.
At any step, the current and next terms require O(max L_i) space.
The returned string is the final term and is included in that output-sized storage.
The sequence's growth means bounds should be stated in terms of generated term lengths.

## Edge cases

n equal to 1 returns 1.
A run of one digit produces count 1 followed by that digit.
A run can contain multiple equal digits, producing a multi-digit count if constraints permit.
The input is positive as required by the sequence definition.

## Common mistakes

- Writing the digit before the count reverses the description format.
- Advancing only one position after a run repeats that digit.
- Reusing the output buffer without clearing it mixes adjacent terms.
- Treating the term as an integer loses leading descriptive digits.

## Language notes

Python collects count and digit fragments before joining them.
Java appends directly to a StringBuilder and then replaces the term.
Both methods keep the sequence as text.
