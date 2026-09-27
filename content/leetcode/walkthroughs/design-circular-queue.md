## Intuition

A circular queue stores values in a fixed array and wraps positions with modulo.
The head and size identify both ends without shifting elements.

## Brute force

Removing from a regular array's front shifts every remaining value.
That makes repeated queue operations O(k) instead of constant time.

## Approach

1. Track the head index and current size.
2. Write enqueued values at head plus size modulo capacity.
3. Advance head and decrement size when dequeuing.
4. Read front and rear using the same indices.

## Walkthrough

Example 1:

With capacity 2, enQueue 1 and 2 succeeds twice.
The third enqueue fails because the queue is full.
Front is 1 and Rear is 2.
After deQueue and enQueue 3, Rear becomes 3.

## Complexity

Every public operation takes O(1) time.
The fixed array uses O(k) space.
Python and Java store values without moving the occupied range.

## Edge cases

An empty queue reports front and rear as -1.
After the last dequeue, the queue is empty even though old array cells remain.
Wraparound can make the rear index numerically smaller than the head.

## Common mistakes

Do not use size as the sole array index without modulo.
Do not confuse full and empty when head equals the tail position.
Advance head only after confirming the queue is nonempty.

## Language notes

Python uses a list and integer fields.
Java uses a primitive array and the required MyCircularQueue method names.
The size field distinguishes an empty queue from a full queue after wraparound.
