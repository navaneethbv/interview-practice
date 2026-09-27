## Intuition

For each matrix row, the consecutive 1s ending at that row form histogram heights.
The largest rectangle in those heights represents a rectangle whose bottom is the current row.
A monotonic stack finds each histogram rectangle when a shorter height closes its span.

## Brute force

A brute-force rectangle search could choose every pair of row boundaries and column boundaries and verify every covered cell.
That requires O((R times C) squared times R times C) work in a direct implementation.
Repeated component or width checks remain much slower than reusing histogram heights and stack spans.

## Approach

1. Maintain one height per column, increasing it for 1 and resetting it for 0.
2. After each row update, scan the histogram with an increasing-height stack.
3. When the current height is smaller, pop entries whose rectangles end before the current index.
4. Use each popped entry's start and height to update the best area.
5. Add a zero-height sentinel so every remaining stack entry is finalized.

## Walkthrough

Example 1 has rows [1, 1, 0] and [1, 1, 1].
After the first row the heights are [1, 1, 0], whose best area is 2.
After the second row they become [2, 2, 1].
The final histogram pops height 2 with width 2 when it reaches the last column, producing area 4.
No rectangle using the new third column is larger, so the answer is 4.

## Complexity

Let R be row count and C be column count.
Each row updates C heights and each histogram entry is pushed and popped at most once, giving O(R times C) time.
The stack and height array use O(C) auxiliary space.
The returned maximum area is a scalar, and the matrix is read in place.

## Edge cases

A row containing all zeroes resets every histogram height.
A matrix with one row reduces to the largest rectangle in one histogram.
A rectangle may begin above the current row and is represented by its carried height.
The statement supplies a nonempty matrix, so matrix[0] is available.

## Common mistakes

- Resetting heights only after processing a row makes zero columns incorrectly continue.
- Forgetting the sentinel leaves rectangles that reach the final column uncounted.
- Popping entries only once can miss a wider rectangle exposed by several shorter heights.
- Reusing a stack across rows carries invalid spans between independent histograms.

## Language notes

Python stores start and height pairs in a list stack.
Java uses a Deque of two-element arrays and extracts the same span boundaries.
Both helpers keep the histogram logic separate from matrix height updates.
