## Intuition

In a valley-shaped array, the largest remaining value is always at one of the two ends.
Removing that endpoint leaves another valley-shaped interval.
Choose the larger endpoint repeatedly and fill the output from largest position toward smallest.

## Brute force

Apply a general comparison sort to a copy of the array.
This takes O(n log n) time and ignores the special shape that permits linear merging.

## Approach

Allocate `result` with the input length and initialize `left` and `right` at the endpoints.
Visit output positions from the last index down to zero.
Compare the remaining endpoint values.
Copy the larger into the current output position and advance its corresponding endpoint inward.
On equality, the references choose the left endpoint, but either choice preserves sortedness and multiplicity.
The completed suffix of result is always sorted and contains the largest values already removed.
No explicit search for the valley bottom is needed, because endpoint comparisons handle both monotone sides together.

## Walkthrough

Example 1 starts with `[8, 4, 2, 6]`.
Compare 8 and 6, placing 8 in the final output position.
Compare the new left endpoint 4 with 6, placing 6 next.
Compare 4 with 2, placing 4 next.
The remaining 2 fills the first position.
The result is `[2, 4, 6, 8]`, assembled backward while the input remains unchanged.

## Complexity

Exactly one endpoint is consumed for every output position.
Both references take O(n) time and O(n) space for the required new array.
Beyond that returned array, only indices and scalar comparisons are needed, giving O(1) auxiliary working space.

## Edge cases

Empty input creates an empty result and performs no endpoint reads.
Plateaus and repeated minimum or maximum values remain valid and retain all occurrences.

## Common mistakes

Choosing the smaller endpoint for the next smallest output position is incorrect because the minimum can be inside the valley.
Do not deduplicate equal endpoint values.

## Language notes

Python uses a descending `range` and explicit pointer updates.
Java uses post-increment and post-decrement after assigning the chosen endpoint value.
