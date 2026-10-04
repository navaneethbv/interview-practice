## Intuition

A building needs two independent witnesses: a strictly shorter building on the left and a strictly taller building on the right.
Monotone stacks identify the nearest qualifying witness on each side.

## Brute force

Scanning outward from every building takes quadratic time in the worst case.
The nearest-witness stacks discard candidates that a newer, more useful building dominates.

## Approach

Scan left to right, popping heights at least the current height.
The remaining stack top, if present, is the nearest strictly shorter building.
Record whether it is within distance k.
Then scan right to left, popping heights at most the current height, and combine the nearest strictly taller condition with the earlier result.
Here k is the supplied visibility radius; if the nearest qualifying witness is too far away, every other qualifying witness is farther still.
Each popped candidate can be replaced by a closer candidate at least as useful for future positions.

## Walkthrough

```text
Input: [[2, 5, 3, 8], 1]
Output: [false, false, false, false]
```

In Example 1, building 5 has shorter 2 immediately left, but its nearest taller building is 8 two positions right, beyond k = 1.
Building 3 has taller 8 immediately right, but its shorter left witness 2 is two positions away.
The endpoints lack one side entirely.
Every result is false.

## Complexity

Each index is pushed and popped at most once per pass, giving O(n) time.
Stacks and output require O(n) space.

## Edge cases

Equal heights do not satisfy either strict condition.
All comparisons use original buildings, even those marked false.

## Common mistakes

Do not remove failed buildings from the street before checking others.
Store indices so visibility distances can be measured.

## Language notes

Python uses list stacks.
Java uses ArrayDeque with its last element as the stack top, preserving the same monotone ordering.
