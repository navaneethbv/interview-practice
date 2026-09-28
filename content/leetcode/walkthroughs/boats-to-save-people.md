## Intuition

The heaviest person determines whether a second passenger can join their boat.
If the lightest person cannot fit with that heaviest person, nobody can, so the heaviest person must travel alone.

## Brute force

Trying all pairings is combinatorial and quickly becomes infeasible.
Greedy pairing without sorting cannot identify the only useful light passenger for the current heaviest person.

## Approach

1. Sort `people` from lightest to heaviest.
2. Consider the current lightest and heaviest unassigned people.
3. If their weights fit, pair them and advance `left`; otherwise leave the heaviest alone.
4. In both cases, remove the heaviest person and increment `boats`.

## Walkthrough

For Example 1, `people = [1,2,2,3]` and `limit = 3`, sorting leaves the same order.
The heaviest person weighs 3, and even the lightest 1 would exceed the limit, so 3 uses one boat alone.
The remaining lightest and heaviest values are 1 and 2, which fit exactly, so they share a boat.
The final remaining 2 needs one boat.
The total is 3 boats, matching the statement.

## Complexity

Sorting dominates the work at O(n log n), and the two pointers then make one linear pass.
Python's list sort can use O(n) temporary space, while Java's primitive array sort uses O(log n) stack space for its sorting implementation.

## Edge cases

A single person always consumes one boat.
When two weights sum exactly to `limit`, pairing is allowed.
If every person is too heavy to pair with anyone else, the answer is the number of people.

## Common mistakes

Do not pair the two lightest people first, because that can strand a heavy person.
Always remove the heaviest person each iteration, whether or not a partner fits.
The input is allowed to be reordered by the reference because only the boat count matters.

## Language notes

Python sorts the list in place, and Java uses `Arrays.sort` on the input array.
Both pointers are indices, so no queue objects or copied passenger records are required.
