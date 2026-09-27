## Intuition

Every window has the same length, so adjacent windows differ by one value leaving and one value entering.
Maintaining that changing sum avoids recomputing each window.

## Brute force

Summing every length-k window independently takes O(nk) time.
It repeats almost all additions and needs O(1) extra space.

## Approach

1. Sum the first k values into a sliding window.
2. Move the window one position at a time by subtracting the outgoing value and adding the incoming value.
3. Keep the largest sum and divide it by k after the scan.

## Walkthrough

Example 1:

For nums [1,12,-5,-6,50,3] and k 4, the first window sums to 2.
The next window removes 1 and adds 50, giving 51.
The final window removes 12 and adds 3, giving 42.
The largest sum is 51, so the returned average is 51 divided by 4, or 12.75.

## Complexity

The scan takes O(n) time and O(1) auxiliary space.
The Python reference sums the first k values with a loop, so it makes no initialization slice copy.
The Java reference uses primitive arithmetic and also keeps O(1) auxiliary space.

## Edge cases

When k equals n, there is only one window.
Negative values work because comparisons use sums rather than assumptions about positivity.
The answer is returned as a floating-point value.

## Common mistakes

Do not compare only the incoming value with the current average.
Do not forget to remove the value at the old left edge.
Use a wide enough sum for the language and constraints before converting to a floating-point result.

## Language notes

Python division produces the required floating-point result.
Java casts the best sum to double before division so integer division cannot truncate the answer.
