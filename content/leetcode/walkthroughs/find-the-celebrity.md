## Intuition

If candidate knows person, candidate cannot be the celebrity.
Otherwise person cannot be the celebrity, so one pass leaves a single candidate to verify.

## Brute force

Checking every person against everyone else takes O(n squared) knows calls.
Candidate elimination reduces the possible celebrity to one before verification.

## Approach

1. Start candidate at person zero.
2. Replace it whenever it knows the next person.
3. Verify that the candidate knows nobody else and everybody else knows the candidate.
4. Return the candidate or -1 when verification fails.

## Walkthrough

Example 1:

For the first example, candidate 0 knows person 1, so candidate becomes 1.
Candidate 1 does not know person 2, so candidate remains 1.
Verification confirms everyone else knows 1 and 1 knows no one else, returning 1.

## Complexity

The elimination and verification scans make O(n) knows calls.
The algorithm uses O(1) auxiliary space.
The environment callback performs the actual relationship lookup in both references.

## Edge cases

For one person, that person is the candidate and the verification loop makes no relationship calls because self-knowledge is ignored.
If everyone knows everyone, verification rejects the candidate.
If no person satisfies both conditions, return -1.

## Common mistakes

Do not verify only that everyone knows the candidate.
The candidate must also know nobody else.
Do not eliminate a person when the candidate does not know that person.

## Language notes

Python calls the supplied knows function.
Java extends Relation and calls its inherited knows method without redeclaring the environment.
