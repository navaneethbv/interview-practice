## Intuition

If exactly k students are selected, every selected student must have a preference below k, and every unselected student must have a preference above k.
After sorting, those conditions only need the boundary students around k.

## Brute force

Enumerating each subset costs O(2^n) and checks the same boundary conditions repeatedly.
Sorting turns every possible k into one adjacent-boundary test.

## Approach

1. Sort `nums`.
2. For each `selected` from 0 through n, check `nums[selected - 1] < selected` when a selected boundary exists.
3. Check `nums[selected] > selected` when an unselected boundary exists.
4. Count every k satisfying both tests.

## Walkthrough

For Example 1, sorting `[1,1]` leaves `[1,1]`.
For k=0, the first unselected preference is 1, so k=0 is valid.
For k=1, the selected preference is not below 1, so it is invalid.
For k=2, the last selected preference 1 is below 2, and there is no unselected student, so it is valid.
The count is 2.

## Complexity

Sorting costs O(n log n), and the boundary scan costs O(n).
Python sorts the input list in place, while Java sorts the supplied `List<Integer>` in place.
Python's in-place sort uses O(n) temporary workspace in its worst case, and Java's list sort has its own O(n) merge workspace.

## Edge cases

k=0 and k=n use one-sided boundary checks.
Equal preference values fail a strict boundary test.
A single student can make both k=0 and k=1 valid when its value is 1.

## Common mistakes

Use strict `<` for selected students and strict `>` for unselected students.
Do not read `nums[-1]` as the left boundary when k is zero.
Count every valid k rather than stopping after the first one.

## Language notes

Python returns the integer accumulated by the loop.
Java uses `List.get` only after guarding the boundary with short-circuit `||`.
