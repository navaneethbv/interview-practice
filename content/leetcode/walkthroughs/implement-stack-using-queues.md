## Intuition

A stack returns the newest value first, while a queue returns the oldest value first.
After each push, rotate the older queue entries behind the newly added value.
The front of the single queue then always represents the stack top.
Pop and top can read that front directly.

## Brute force

Keeping values in their insertion order would make push constant time but require rotating or scanning during every pop.
That design does not provide a constant-time top operation and can make later operations harder to reason about.
Two queues could also implement rotation, but one queue is enough when the older entries are moved behind the new entry.

## Approach

1. Push x at the queue's back.
2. Record the number of older values, which is the queue size after insertion minus one.
3. Remove and append exactly those older values.
4. The new value is now at the front.
5. Pop removes the front, top reads it without removal, and empty checks whether the queue has no entries.

## Walkthrough

For Example 1, push 1 creates [1].
Push 2 first creates [1,2], then rotates the one older value to produce [2,1].
Top reads 2 and pop removes 2, leaving [1].
The final empty call is false.
Example 2 starts with an empty queue, pushes 3, removes it, and reports true for empty.

## Complexity

A push rotates all existing values and takes O(q) time for q stored values.
Pop, top, and empty take O(1) time.
The queue stores O(q) values.
The problem's operation limit bounds the total work for a test.

## Edge cases

Pushing into an empty stack requires zero rotations.
Repeated values remain distinct queue entries even when their values match.
The contract guarantees that pop and top are called only when nonempty.
After the last pop, empty returns true.

## Common mistakes

Do not rotate the new value itself, or the ordering will be reversed.
Do not use the queue size as a loop bound after each rotation without first fixing the number of older values.
Do not make top remove an item.
Do not return a value from push because the spec expects void behavior.

## Language notes

Python uses collections.deque and rotates with popleft followed by append.
Java uses the harness's existing Queue and ArrayDeque imports.
Both references expose the required MyStack class and four methods.
