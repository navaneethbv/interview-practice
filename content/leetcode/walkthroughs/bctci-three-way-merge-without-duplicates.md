## Intuition

The smallest unconsumed value across the three sorted arrays is the next value in their combined order.
Once values are consumed in that order, duplicates can be removed by comparing only with the last emitted value.

## Brute force

Concatenating the arrays, sorting them, and removing duplicates takes O(N log N) time for N total entries.
The existing sorted order permits a linear merge without a large lookup set.

## Approach

Keep one position per source array.
At each iteration, inspect the fronts of all nonexhausted arrays and choose the smallest.
Advance that source's position exactly once.
Append the chosen value only if merged is empty or its final value differs.
Stop when every source is exhausted.
Since every next candidate is at least the previously consumed value, all copies of a value arrive consecutively in the merged stream.
The final-value comparison therefore removes duplicates both within and across inputs.

## Walkthrough

```text
Input: arr1 = [2, 3, 3, 4, 5, 7], arr2 = [3, 3, 9], arr3 = [3, 3, 9]
Output: [2, 3, 4, 5, 7, 9]
```

Example 1 first emits 2 from arr1.
The next several fronts are all 3, so only the first consumed 3 is emitted.
Values 4, 5, and 7 then appear from arr1 in order.
The two occurrences of 9 in the other arrays produce one final 9.
The result is `[2, 3, 4, 5, 7, 9]`.

## Complexity

Each iteration consumes one element and inspects at most three fronts, giving O(N) time.
Working state is O(1) because the number of arrays is fixed.
The result requires O(U) space for U distinct values; Java also converts its intermediate result list to an array.

## Edge cases

All-empty inputs return empty output.
Exhausted sources are ignored.
An input consisting entirely of one repeated value contributes at most one output occurrence.

## Common mistakes

Do not stop when just one source ends.
Advancing all three pointers unconditionally can discard unprocessed values.

## Language notes

Python selects the minimum value-source pair.
Java scans three source indices explicitly; equal-value source tie order does not affect the distinct sorted result.
