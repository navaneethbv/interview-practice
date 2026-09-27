## Intuition
Fixing a subarray's left endpoint lets its right endpoint grow one element at a time.
The running minimum and maximum can then be updated incrementally instead of rescanning each subarray.
Adding `maximum - minimum` for every extension counts every nonempty subarray exactly once.

## Brute force
A naive implementation would enumerate every pair of endpoints and scan the entire subarray to find its extremes.
That takes O(N cubed) time.
Maintaining the extremes while extending a fixed start reduces one full scan.

## Approach
1. Choose each index as the start of a subarray.
2. Initialize both `smallest` and `largest` to the value at that index.
3. Extend the end index across later values, updating both extremes.
4. Add their difference to the total after each extension.

## Walkthrough
Example 1 is `[1, 3, 2]`.
Starting at index 0, the one element subarray contributes zero.
Extending to 3 gives `smallest = 1`, `largest = 3`, and contribution 2.
Extending to 2 keeps the smallest at 1 and largest at 3, adding another 2.
Starting at index 1, the pair `[3, 2]` has range 1.
The total is `2 + 2 + 1 = 5`, matching the stated output.

## Complexity
There are O(N squared) start and end pairs, with constant work per extension.
The algorithm therefore takes O(N squared) time and O(1) additional space.
The total is a 64-bit result in the Java contract because many ranges can accumulate.

## Edge cases
A one-element input has no positive range and returns zero.
Equal values contribute zero even when the subarray contains several elements.
Negative values work because minimum and maximum are compared directly.
The Java cast to `long` happens before adding each difference.

## Common mistakes
Forgetting to include the current extension omits subarrays.
Using an `int` accumulator in Java can overflow before the final return.
Resetting the extremes for every right endpoint loses the quadratic improvement.

## Language notes
Python integers grow as needed, so its accumulator naturally handles the full sum.
Java returns `long` and casts the high value before subtraction and addition.
Both references intentionally use the straightforward quadratic method because N is at most 1000.
