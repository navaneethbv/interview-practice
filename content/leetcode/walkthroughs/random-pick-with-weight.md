## Intuition

Each weight represents a consecutive interval of random tickets.
Prefix sums turn those intervals into cumulative endpoints, so one random ticket identifies an index.
Binary search finds the first endpoint strictly larger than the zero-based ticket.

## Brute force

A direct implementation could subtract weights from a random ticket one index at a time.
That makes each pick O(n) in the worst case, although it still gives the right distribution when the ticket range is correct.
Prefix sums move the repeated interval work into construction and reduce every pick to binary search.

## Approach

1. Copy the weights into cumulative prefix sums.
2. Generate a uniform integer from zero through total weight minus one.
3. Binary search for the first prefix sum greater than that integer.
4. Return that prefix position as the selected index.
5. Keep the random generator on the object so successive calls use one deterministic reference stream.

## Walkthrough

Example 1 constructs the weights [2], whose only prefix sum is 2.
The seeded generator produces tickets from the range [0, 2), and either ticket belongs to index 0.
Each of the three displayed pickIndex calls therefore returns 0.
With multiple weights, index 0 owns tickets below its first prefix endpoint, and later indices own the following intervals.

## Complexity

For n weights, construction takes O(n) time and O(n) space for prefix sums.
Each pickIndex call takes O(log n) time and O(1) auxiliary space.
The returned index is selected with probability weight divided by total weight because every ticket is equally likely.
The references use a fixed seed for repeatable local expected outputs, while the interval algorithm is the distribution contract.

## Edge cases

A single positive weight always selects index 0.
A larger weight creates a proportionally longer ticket interval.
The input must contain positive weights so the total ticket range is nonzero.
The cumulative sums use integer arithmetic, matching the judge's integer-weight contract.

## Common mistakes

- Using random values from one through total weight shifts every interval boundary.
- Searching for the first prefix sum greater than or equal to the ticket mishandles exact boundaries.
- Recomputing prefix sums inside pickIndex wastes the preprocessing benefit.
- Returning the interval endpoint rather than its index returns an invalid position.

## Language notes

Python uses bisect_right, which returns the first prefix sum strictly above the ticket.
Java performs the equivalent lower-bound search over the copied cumulative array.
Java keeps the required constructor and no-argument pickIndex design-problem interface.
