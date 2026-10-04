## Intuition

Suspicion requires both physical adjacency and identical nonempty mistake signatures.
A signature must record which questions were wrong and which incorrect answers were chosen, not merely the number of errors.

## Brute force

Comparing every pair of students costs O(n squared times q) for q questions.
A desk lookup reduces candidate pairs to immediate right neighbors.

## Approach

Build `by_desk` and a mistake signature for each student.
For each occupied desk, look up desk + 1 and verify that both desk numbers belong to the same row.
Compare their signatures only when the first is nonempty.
Append the two IDs in increasing order when signatures match.
Checking only the right neighbor emits each adjacent pair once.
The row calculation accounts for the statement's one-based desk numbers.

## Walkthrough

```text
Input: answers = "abcc", m = 5, students = [[4, 10], [1, 6], [3, 8], [5, 11], [9, 7], [6, 16]], responses = ["abcd", "abcd", "abdd", "abcd", "abcd", "abdd"]
Output: [[1, 9]]
```

In Example 1, IDs 1 and 9 occupy desks 6 and 7.
Both answer `abcd` instead of `abcc`, giving the same mistake at zero-based question 3: answer d.
They are adjacent in the same row, so `[1, 9]` qualifies.
Desks 10 and 11 lie in different rows despite consecutive numbers.
The other candidate signatures differ, leaving only the stated pair.

## Complexity

For n students and q questions, signature construction and comparisons take O(nq) time.
Stored signatures require O(nq) space in the worst case, plus O(n) desk lookup and output storage.
Java's textual question indices also contribute their digit lengths.

## Edge cases

Two perfect responses are never suspect.
Empty desks break adjacency.
When m is one, no row contains adjacent desks.

## Common mistakes

Equal wrong-question sets are insufficient if the wrong answers differ.
Do not join the last desk of one row to the first of the next.

## Language notes

Python stores tuples of index-answer pairs.
Java serializes signatures with separators and uses string value equality, preserving the same comparison semantics.
