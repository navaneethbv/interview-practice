## Intuition
A value is lonely only when its own frequency is one and neither adjacent integer appears anywhere.
A frequency map answers all three questions in constant expected time for each distinct value.
The result order is unrestricted, so iterating the map is enough.

## Brute force
For each number, scan the entire array to count it and search for its two neighbors.
Repeating those scans costs O(N squared) time.
A single frequency map avoids revisiting the input for every candidate.

## Approach
1. Count every value with a frequency map.
2. Iterate over each distinct value and keep it only if its count is one.
3. Check that `value - 1` and `value + 1` are absent from the map.
4. Append every surviving value to the result.

## Walkthrough
Example 1 is `[2, 4, 4, 7, 8, 10]`.
The map records count one for 2, 7, 8, and 10, and count two for 4.
Value 2 has no 1 or 3, so it is added.
Value 7 has neighbor 8, and value 8 has neighbor 7, so both are rejected.
Value 10 has no 9 or 11, so it is added.
The returned values are `[2, 10]`, in any order.

## Complexity
Building and scanning the frequency map takes O(N) expected time.
The map and output use O(N) auxiliary space in the worst case.

## Edge cases
A value at zero checks for `-1` safely because map lookup does not require an array index.
Repeated values are rejected even when their neighbors are absent.
An isolated value near the maximum allowed number is handled the same way.

## Common mistakes
Checking only adjacent positions misses neighbors that occur elsewhere.
Returning a repeated value violates the exactly-once condition.
Sorting is unnecessary and can distract from the frequency requirement.

## Language notes
Python uses `Counter` and list construction over its entries.
Java uses `HashMap<Integer, Integer>` and `ArrayList<Integer>` with boxed values.
Both implementations rely on expected constant-time hash lookups and preserve the unordered result contract.
