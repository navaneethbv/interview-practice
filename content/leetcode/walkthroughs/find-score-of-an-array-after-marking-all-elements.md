## Intuition
The process always chooses the smallest unmarked value, breaking equal-value ties by index.
Once chosen, that index and its immediate neighbors are marked, so sorting value-index pairs simulates the process directly.

## Brute force
Repeatedly scanning the whole array for the smallest unmarked value costs O(N^2).
Ordering each index once reduces selection to a single pass after sorting.

## Approach
1. Create `(value,index)` pairs and order them by value then index.
2. Skip a pair if its index is already marked.
3. Add its value to the score and mark its index plus valid neighbors.
4. Return the accumulated score.

## Walkthrough
Example 1 is `[2,1,3,4,5,2]`.
The ordered pairs begin with value 1 at index 1, so add 1 and mark indices 0,1,2.
The next usable value is 2 at index 5, so add 2 and mark indices 4 and 5.
Index 3 remains and contributes 4, for a total score of 7.

## Complexity
Sorting the N value-index pairs costs O(N log N), and marking checks are O(1) each.
The Python sorted pair list and marked set use O(N) auxiliary space.
Java's boxed index array and boolean marker array also use O(N) additional space.

## Edge cases
A one-element array contributes its only value.
Equal values are processed by increasing index, matching the tie rule.
Neighbor marking must stay inside array bounds.

## Common mistakes
Sorting values without their original indices loses the marking relationships.
Marking only the selected index permits an adjacent value that should be skipped.
Using a heap without a stable index tie key can choose the wrong equal-value item.

## Language notes
Python's tuple sort naturally applies value then index ordering.
Java sorts boxed indices with a comparator and stores the running total in `long`.
