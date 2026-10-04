## Intuition

The queue must remember every value in arrival order, but a maximum query needs only values that could still become the largest remaining item.
A newly appended larger value makes smaller values behind the current maximum permanently irrelevant: those older values leave before the new one.
Keep these candidates in a second deque.

## Brute force

Maintain an ordinary FIFO queue and scan all its values for every maximum query.
That makes each maximum query O(n), violating the required amortized constant time.

## Approach

`queue` stores all entries, while `maximums` stores a nonincreasing sequence of candidate values.
On push, remove strictly smaller candidates from the back, then append the new value to both structures.
On pop, remove the oldest queue value.
If it equals the first maximum candidate, remove that candidate too.
The maximum is always the front of `maximums`; peek and size use the ordinary queue.
Equal candidates must remain separately represented because duplicate maxima can depart at different times.

## Walkthrough

Example 1 begins with size zero and pushes 2, giving candidate deque `[2]`.
Pushing 5 removes candidate 2 and produces `[5]`, while the FIFO queue still contains `[2, 5]`.
Pushing another 5 leaves candidates `[5, 5]`.
Popping 2 leaves the maximum unchanged.
The next pop removes the first 5 and one matching candidate, so the remaining maximum is still 5.
After the last 5 leaves, pushing and popping 8 works on the emptied structures and size returns zero.

## Complexity

Each value enters and leaves each deque at most once.
Thus all operations are amortized O(1), although one push may remove O(n) candidates.
Space is O(n), including repeated maximum values.

## Edge cases

A decreasing sequence keeps every element as a candidate.
The contract guarantees element-requiring queries are never called on an empty queue.

## Common mistakes

Removing equal values during push loses the multiplicity needed when one duplicate leaves.
Candidate removal must correspond to the popped value, not the new queue front.

## Language notes

Python uses `deque`; Java uses `ArrayDeque<Integer>`.
Both support constant-time operations at both ends without shifting array contents.
