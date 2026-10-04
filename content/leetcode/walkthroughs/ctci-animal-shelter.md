## Intuition

Adoption order depends on arrival time, while a species-specific adoption ignores animals of the other species.
Two FIFO queues preserve each species' order.
A monotonically increasing arrival number lets their front animals be compared whenever any species is acceptable.

## Brute force

A single arrival list supports adopting the oldest animal directly, but finding the oldest dog or cat can require scanning many animals.
Removing a middle entry from an array also requires shifting later entries.

## Approach

Maintain one queue for dogs and one for cats.
`enqueue` attaches the current `arrivals` number to the animal's name, then increments the counter.
Species-specific dequeue removes from the corresponding front, returning an empty string when that queue is empty.
`dequeueAny` handles an empty queue first; otherwise it compares both front arrival numbers and releases the earlier animal.
Animals behind a queue's front cannot be the earliest remaining animal of that species.

## Walkthrough

Example 1 enqueues Rex the dog with arrival 0, Tom the cat with arrival 1, and Kit the cat with arrival 2.
`dequeueCat` removes Tom even though Rex arrived earlier overall.
The next `dequeueAny` compares Rex's 0 with Kit's 2 and returns Rex.
Only Kit remains, so the following `dequeueAny` returns Kit.
The three enqueue operations contribute null entries to the operation output.

## Complexity

All operations take O(1) amortized time with deque operations.
Space is O(n) for n animals currently waiting; the arrival counter needs constant additional storage.

## Edge cases

An entirely empty shelter returns the empty string for every dequeue variant.
Repeated names do not affect ordering because timestamps identify arrivals independently of names.

## Common mistakes

Do not compare animal names or reset the counter when a queue empties.
Removing from the back would implement newest-first adoption instead of FIFO order.

## Language notes

Python stores `(arrival, name)` tuples in `collections.deque`.
Java stores an `Animal` record in `ArrayDeque` and uses front-oriented removal methods.
