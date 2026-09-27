## Intuition

For a new price, earlier prices no larger than it can be absorbed into their already computed spans.
A monotonic decreasing stack stores each remaining price together with the whole span it represents.

## Brute force

Walking backward over every previous price for each call can take O(n squared) over n calls.
It repeatedly examines prices already known to be covered by an earlier span.

## Approach

1. Start the new span at one day.
2. Pop stack entries whose prices are less than or equal to the new price and add their spans.
3. Push the new price and its combined span.

## Walkthrough

Example 1:

For prices 100, 80, 60, 70, 60, 75, 85, the first three spans are 1, 1, and 1.
Price 70 pops 60 and gets span 2.
Price 75 pops 60 and then the 70 span, giving 4.
Price 85 absorbs 75's span and 80, giving the final span 6.

## Complexity

Each price is pushed once and popped at most once, so the amortized time per call is O(1).
The stack uses O(n) space after n calls.
Python stores pairs, while Java stores primitive two-element arrays in its deque.

## Edge cases

An equal price is included because the condition is less than or equal.
The first call always returns one.
Prices that keep decreasing remain as separate stack entries.

## Common mistakes

Do not pop only strictly smaller prices.
Do not store just prices without the span each popped price summarizes.
Do not reset the stack between calls.

## Language notes

Python uses a list as a stack.
Java uses ArrayDeque and preserves the state in the StockSpanner object between calls.
