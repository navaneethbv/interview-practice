## Intuition

Only the number of bad days in a chosen interval matters.
Each bad day needs one campaign boost, while a day already meeting the sales threshold needs none.
This turns the problem into a longest window with cost at most k.

## Brute force

Trying every interval and counting its bad days separately takes cubic time.
Maintaining running counts per start improves that to quadratic time, but still revisits the same days repeatedly.

## Approach

Maintain `left`, `cost`, and `best` while extending the window with `right`.
Add one to `cost` exactly when the new sales value is below 10.
While the cost exceeds k, subtract the departing day's cost and advance `left`.
The resulting window is feasible, so compare its length with `best`.
Costs are nonnegative, making this shrinking rule valid: extending a window cannot repair an excessive cost.
For each right endpoint, the reference retains the longest feasible suffix ending there.

## Walkthrough

```text
Input: sales = [5, 0, 20, 0, 5], k = 2
Output: 3
```

Example 1 maps sales to costs `[1, 1, 0, 1, 1]`.
The first three days cost 2 and give length 3.
Adding the fourth day raises the cost to 3, so the first day leaves the window.
Adding the fifth day similarly forces another bad day out.
No feasible window exceeds length 3, which is returned.

## Complexity

Each day enters and leaves the window at most once, so time is O(n).
Only counters and indices are stored, giving O(1) extra space.
The sales array is not changed.

## Edge cases

With k equal to zero, only existing good-day runs qualify.
An empty array returns zero.
A budget covering every bad day allows the entire array.

## Common mistakes

A sale count of exactly 10 is already good.
Use a while loop when shrinking, since several leading good days may need to be removed before cost falls.

## Language notes

Python explicitly converts the bad-day condition to a cost.
Java stores the running cost in `long`, although each individual contribution is only zero or one.
