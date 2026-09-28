## Intuition
Apples can be split freely, so only the total number of apples matters.
To minimize the number of boxes, use the largest capacities first.
The first prefix of sorted capacities whose sum reaches the total is optimal because every other set of the same size has no greater capacity.

## Brute force
Trying every subset of boxes would take exponential time in the number of boxes.
Sorting gives an exchange argument: if a chosen set contains a smaller box while an unchosen box is larger, swapping them never hurts.

## Approach
1. Sum all apples into `remaining`.
2. Sort capacities in descending order.
3. Subtract each capacity in that order.
4. Return the count as soon as `remaining` is nonpositive.

## Walkthrough
Example 1 has apples `[2, 3]`, totaling 5, and capacities `[1, 4, 3]`.
The descending capacities are 4, 3, and 1.
Using the box of capacity 4 leaves one apple.
Using the box of capacity 3 leaves negative two, so two boxes are sufficient and the method returns 2.

## Complexity
Summing A apple-package counts costs O(A), sorting B capacities costs O(B log B), and the scan is O(B).
Total time is O(A + B log B).
The sort may use O(B) auxiliary space depending on the language implementation.
The references otherwise use O(1) explicit working space beyond the sorted capacity storage.

## Edge cases
One box exactly matching the total returns 1.
Several small boxes may be required when no large box exists.
The stated guarantee that total capacity is sufficient means the scan reaches a nonpositive remainder.

## Common mistakes
Choosing boxes in input order can use more boxes than necessary.
Treating each apple package as indivisible ignores the free splitting rule.
Returning the number of boxes examined before subtracting the current capacity shifts the answer.

## Language notes
Python creates a descending sorted copy with `sorted`.
Java sorts the capacity array in ascending order and scans it backward, mutating the local input array.
Both accumulate totals in `int`, which fits the stated maximum totals.
