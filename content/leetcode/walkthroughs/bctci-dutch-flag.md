## Intuition

Partition the array into finished red, white, and blue regions plus one unknown region.
Each inspection moves one item out of the unknown region without needing another complete pass.

## Brute force

Comparison sorting ignores the three-value structure and takes O(n log n).
Counting colors and rewriting works in linear time but uses two passes, unlike the required partition scan.

## Approach

Maintain `red`, `current`, and `blue`.
Positions before red are R, positions from red to current - 1 are W, and positions after blue are B.
An R swaps with red, after which both red and current advance.
A W only advances current.
A B swaps with blue and decrements blue, leaving current in place to inspect the previously unknown item received from the right.
Stop when current passes blue, meaning no unknown positions remain.

## Walkthrough

```text
Input: arr = ["R", "W", "B", "B", "W", "R", "W"]
Output: ["R", "R", "W", "W", "W", "B", "B"]
```

Example 1 first accepts R and W.
The B at index 2 swaps with the final W, which is then accepted.
The next B swaps with the R at index 5.
That R swaps into the red boundary, expanding the red prefix to two entries.
The remaining W completes the middle region, leaving `[R, R, W, W, W, B, B]`.

## Complexity

Every iteration reduces the unknown region by one, giving O(n) time.
Three indices and one temporary swap value use O(1) extra space.
The output is the mutated input array.

## Edge cases

Empty and single-color arrays require no special treatment.
Swapping a position with itself is harmless.
A two-element blue-red array must revisit the received red.

## Common mistakes

Advancing current after a blue swap can skip an unprocessed red or blue.
The loop must include current equal to blue.

## Language notes

Python uses tuple assignment for swaps.
Java uses a helper with a temporary char and returns void, matching the mutation-based grading contract.
