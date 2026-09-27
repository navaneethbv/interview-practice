## Intuition

The average of the most recent values can be maintained from a running total.
When a new value arrives, add it to the total and remove the oldest value if the window is full.
The queue preserves insertion order, so the outgoing value is always available at the front.

## Brute force

A naive implementation could keep every value and sum the last size values for every next call.
With t calls, a single result can scan O(size) values, making the total O(t × size) time.
The queue and running total make each call constant time after the bounded window is maintained.

## Approach

1. Store the requested window size, an empty queue, and total equal to zero.
2. Append each val and add it to total.
3. If the queue is larger than size, remove its first value from total.
4. Divide total by the current queue length.
5. Return the floating point average.

## Walkthrough

Example 1 constructs MovingAverage with size = 3.

| operation | queue | total | returned average |
| --- | --- | ---: | ---: |
| next(1) | [1] | 1 | 1.0 |
| next(10) | [1, 10] | 11 | 5.5 |
| next(3) | [1, 10, 3] | 14 | 4.666666666666667 |
| next(5) | [10, 3, 5] | 18 | 6.0 |

The fourth call adds 5 and removes the oldest value 1 before dividing by 3.

## Complexity

Let t be the number of next calls.
Each `next` call performs a bounded number of queue operations and arithmetic, taking O(1) time per call and O(t) across t calls.
The queue stores at most size values, giving O(size) auxiliary space.
The returned values are produced one at a time and are not stored by the class.

## Edge cases

The first result divides by the number of values seen, not by size when the queue is not full.
A size of one returns the newest value.
Negative values work because total is updated symmetrically.
A long Java total prevents overflow across many integer inputs.

## Common mistakes

- Dividing by size before the queue is full gives the wrong early averages.
- Removing the newest value instead of the oldest breaks the sliding window.
- Recomputing a sum each time loses the constant time update.
- Using integer division truncates the required result.

## Language notes

Python uses collections.deque and Python division returns a floating point value.
Java uses ArrayDeque and casts the long total to double before division.
The Java total is long even though each input value is an int, which protects accumulated sums.
