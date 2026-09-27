## Intuition
Removing consecutive horizontal bars creates one vertical opening whose side length is the number of removed bars plus one.
The largest square uses the shorter of the longest consecutive runs among horizontal and vertical removed bars.

## Brute force
Trying every contiguous bar interval and measuring its resulting hole takes O(H^2 + V^2) time.
A single sorted scan finds each longest run in linear time after sorting.

## Approach
1. Sort `hBars` and find the longest run where successive values differ by one.
2. Do the same for `vBars`.
3. Let `side` be the smaller run length plus one.
4. Return `side * side`.

## Walkthrough
Example 1 has `n = 3`, `m = 3`, `hBars = [2,3]`, and `vBars = [2,3]`.
Both lists contain a consecutive run of length two, so removing them opens three units in each direction.
The largest square therefore has side `min(2,2) + 1 = 3` and area `9`.

## Complexity
Sorting the two lists costs O(H log H + V log V) time.
The consecutive-run scans cost O(H + V).
Python's `sorted` creates O(H + V) temporary copies, while Java sorts the supplied arrays in place and uses O(1) extra scan space.

## Edge cases
An empty bar list gives a run length of zero and therefore cannot enlarge that dimension beyond one.
Nonconsecutive removals form separate openings, so their run lengths must not be added together.
When the horizontal and vertical runs differ, the shorter opening limits the square.

## Common mistakes
Using the number of removed bars as the side forgets the two boundary gaps and is off by one.
Combining separated bars treats multiple openings as one hole.
Taking the larger dimension would describe a rectangle rather than a square.

## Language notes
Python sorts copies made from the input lists before scanning consecutive values.
Java sorts the arrays and tracks the current and best run with integer counters.
