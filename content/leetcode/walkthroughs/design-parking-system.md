## Intuition

The three car types never share capacity, so one counter per type is enough.
Each successful arrival consumes exactly one unit from its corresponding counter.

## Brute force

No search is needed for this design problem.
Tracking individual parked cars would add state without helping answer whether a type still has space.

## Approach

1. Store `[big, medium, small]` capacities in `available`.
2. Convert `carType` from 1-based to a zero-based index.
3. Return false when that counter is zero.
4. Otherwise decrement it and return true.

## Walkthrough

This is Example 1 from the local statement.
The constructor starts with capacities `[1,1,0]`.
Adding a big car consumes the first slot and succeeds, and adding a medium car consumes the second.
Adding a small car fails because its capacity starts at zero.
The second big-car request also fails because the big counter was already decremented to zero.

## Complexity

Construction and each `addCar` operation take O(1) time.
The object stores only three counters, so auxiliary space is O(1).

## Edge cases

Zero initial capacity rejects every car of that type.
Multiple successful cars consume capacity one at a time.
The contract restricts car types to 1, 2, and 3, so the converted index is valid.

## Common mistakes

Do not let one car type use another type's space.
Check capacity before decrementing it.
Keep state on the instance so operation order affects later results.

## Language notes

Python stores counters in a list, while Java stores them in an `int[]` field.
Both constructors preserve the design-class contract used by the operation harness.
