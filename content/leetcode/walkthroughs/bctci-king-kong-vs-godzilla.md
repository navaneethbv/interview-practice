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
The reference sets k to the full street length, so every existing witness automatically passes the distance check.
Each popped candidate can be replaced by a closer candidate at least as useful for future positions.

## Walkthrough

```text
Input: [[2, 5, 3, 8]]
Output: [false, true, true, false]
```

In Example 1, height 5 has shorter 2 to its left and taller 8 to its right.
Height 3 also has shorter 2 and taller 8.
The first building has no left witness, and the last has no right witness.
The result is `[false, true, true, false]`.

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
