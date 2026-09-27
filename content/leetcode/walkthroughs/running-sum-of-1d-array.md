## Intuition

Each running total is the previous total plus the next input value.
One accumulated variable is enough while a separate output array records every prefix total.

## Brute force

Re-summing the prefix for every position takes O(n squared) time.
It repeats all earlier additions.

## Approach

1. Start the total at zero.
2. Add each value to the total in order.
3. Append or store the new total at the matching output position.

## Walkthrough

Example 1:

For [1,2,3,4], the totals become 1, then 3, then 6, then 10.
The output is [1,3,6,10].
Each output position therefore describes the entire prefix ending at that same input position.

## Complexity

The single pass takes O(n) time.
The output array requires O(n) space, with O(1) additional working space.
Both languages store one output value per input position.

## Edge cases

Negative values subtract from the running total.
A one-element array returns that element.
The input constraints keep the running totals within the reference integer type.

## Common mistakes

Do not reset the total at each index.
Store the updated total after adding the current value.
Return all prefix totals rather than only the final sum.
Do not reuse a stale output position when the input contains negative values.

## Language notes

Python appends to a new list.
Java fills a new primitive array and leaves the input unchanged.
The two implementations expose the same prefix values even though their output containers differ.
The input order is preserved throughout the pass.
The accumulated total is updated before each value is stored.
