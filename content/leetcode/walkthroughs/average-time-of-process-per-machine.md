## Intuition

Each process has one start row and one end row for its machine and process id.
Joining those matching rows gives each duration, and grouping by machine gives its average.

## Brute force

Pairing every start with every activity row can examine unrelated machines and processes.
The join condition lets SQLite discard rows that cannot form a process duration.

## Approach

1. Treat start rows as the left side of a self-join.
2. Match machine id and process id while requiring the right row to be an end.
3. Compute end timestamp minus start timestamp.
4. Group by machine and round the average to three decimal places.

## Walkthrough

Example 1:

Machine 0 has durations 2.5 minus 1, which is 1.5, and 6.5 minus 4, which is 2.5.
Their average is 2.0.
The query returns machine 0 with processing time 2.0.

## Complexity

Without indexes, the self-join has O(A squared) worst-case comparison work before grouping.
SQLite may choose an indexed or hash-like plan from the available schema.
The result uses O(M) rows for M machines.

## Edge cases

Each process contributes only after its matching end row is found.
Fractional timestamps remain fractional during subtraction and averaging.
Machines are grouped independently.

## Common mistakes

Do not join only on machine id because process ids would cross-pair.
Do not include end rows as starts.
Apply ROUND to the average, not separately to every duration.

## SQLite notes

The reference uses a self-join on Activity and SQLite ROUND with precision three.
The query does not invent ordering because the contract specifies grouped results without an order requirement.
