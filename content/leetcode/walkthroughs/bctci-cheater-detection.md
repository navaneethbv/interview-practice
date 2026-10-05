## Intuition

A suspect pair needs both a seating relationship and identical nonempty mistake information.
The signature must include each wrong question's position and the actual wrong answer, since matching only the number of errors loses the evidence required by the statement.

## Brute force

Compare every pair of students, checking their desks and all responses.
With s students and q questions, that approach can require O(s squared times q) work.

## Approach

Build `by_desk` to map occupied desks to student IDs and `mistakes` to map each ID to its error signature.
For each desk, look only for the occupant of `desk + 1`.
Check `(desk - 1) // m == desk // m` to exclude adjacency across row boundaries.
If both signatures are equal and nonempty, append the IDs in ascending order.
Looking only to the right emits each neighboring pair once.

## Walkthrough

In Example 1, the answer key is `abcc` and rows have five desks.
Students 1 at desk 6 and 9 at desk 7 both answer `abcd`, making exactly the same error on the final question.
They form `[1, 9]`.
Students 4 and 5 also answer `abcd`, but desks 10 and 11 lie in different rows.
No other adjacent pair has an equal mistake signature.

## Complexity

Expected time is O(sq), including constructing and comparing error signatures.
Python stores O(sq) signature entries in the worst case.
Java's textual question indices can add a logarithmic factor in q to signature storage and construction.

## Edge cases

Perfect scores never produce suspect pairs.
Missing desks break adjacency, and student IDs need not follow seating order.
A single student produces no pair.

## Common mistakes

Do not compare only incorrect question positions or treat the boundary between two rows as neighboring seats.
Do not include identical perfect answers.

## Language notes

Python uses tuples of `(question index, answer)` pairs.
Java creates a delimited string with `mistakeKey`; its output pairs are sorted internally, while pair order is unrestricted.
