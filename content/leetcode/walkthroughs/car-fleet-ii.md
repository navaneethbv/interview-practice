## Intuition

Process cars from right to left and keep a stack of fleets that a car may catch.
A car can use the fleet ahead only if it reaches it no later than that fleet's own collision time.

## Brute force

Simulating every pair and then repeatedly merging fleets can be quadratic.
The stack discards cars that are permanently hidden behind a slower fleet.

## Approach

1. Start with the rightmost car and an empty candidate stack.
2. Remove a candidate whose speed is at least the current car's speed.
3. Compute catch time for the nearest remaining candidate.
4. Accept it if that candidate has no earlier collision or is reached before then; otherwise pop it and continue.

## Walkthrough

For Example 1, car 0 at position 1 and speed 2 catches car 1 at position 2 and speed 1 after one second.
Car 2 at position 4 and speed 3 catches car 3 at position 7 and speed 2 after three seconds.
The stack logic records times `[1,-1,3,-1]`, matching the local output.

## Complexity

Each car is pushed and popped at most once, so time is O(n) and the stack uses O(n) space.
Python computes floating times directly; Java stores them in a `double[]` and uses an integer stack array.

## Edge cases

A slower or equal-speed car never catches the fleet ahead.
A candidate that collides earlier with another fleet may be unreachable and must be popped.
The rightmost car always has time -1.

## Common mistakes

Compare against the candidate's collision time.
Process from right to left.
Do not let a car pass through a fleet it reaches after that fleet has merged.

## Language notes

Python's list is the candidate stack.
Java's fixed `int[]` avoids boxing stack indices.
