## Intuition

Every interior Pascal value is the sum of the two values above it.
The first and last value of each row are always one.
Keeping previous rows makes each new row directly match the recurrence and the requested output.

## Brute force

A naive recursive method could recompute the same binomial coefficient for every cell.
That creates overlapping subproblems and exponential repeated work.
The row dynamic program computes each interior value once while producing the required triangle.

## Approach

1. Start with an empty triangle.
2. Create rowIndex plus one entries initialized to one.
3. For each interior column, add the two values from the previous row.
4. Append the completed row to the triangle.
5. Continue until numRows rows have been produced.

## Walkthrough

Example 1 requests three rows.
Row zero is [1].
Row one has no interior position, so it is [1, 1].
For row two, the interior value is the sum of the two ones above it, giving [1, 2, 1].
The returned triangle is [[1], [1, 1], [1, 2, 1]].

## Complexity

For numRows equal to r, the triangle contains O(r squared) output values.
The algorithm computes each value once, so its time complexity is O(r squared).
The stored triangle itself uses O(r squared) output space.
Beyond that returned triangle, the loop variables use O(1) auxiliary space because each current row becomes part of the output.

## Edge cases

Zero rows return an empty list.
One row returns [[1]].
Interior positions use only the immediately previous row.
The output keeps rows in increasing length order.

## Common mistakes

- Reading beyond the previous row's endpoints corrupts the edge values.
- Replacing edge ones with sums changes the recurrence boundaries.
- Returning only the last row does not satisfy the triangle output.
- Recomputing every coefficient recursively wastes work on repeated subproblems.

## Language notes

Python initializes each row with one values and updates interior positions from the stored triangle.
Java builds ArrayList rows and reads the previously stored row for interior entries.
Both methods return nested rows rather than a flattened sequence.
