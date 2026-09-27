## Intuition

Only a right-moving survivor followed by a left-moving asteroid can collide.
The most recent survivor is the first possible opponent, so a stack models the collision order.
A larger asteroid remains, equal asteroids both disappear, and a smaller survivor is popped before the incoming asteroid continues.

## Brute force

Repeatedly rebuilding the whole array after each collision can take O(n²) time because one asteroid may trigger many rescans.
The stack removes each destroyed asteroid once and never revisits settled pairs.

## Approach

1. Append each `value` to `survivors` unless it is moving left into a positive survivor.
2. While a collision is possible, compare the top size with `-value`.
3. Pop a smaller top, stop both on equality, or discard the incoming value when the top is larger.
4. Append the incoming value when `survives` remains true.

## Walkthrough

Example 1 is `[5, 10, -5]`.

| incoming value | stack before | collision action | stack after |
| ---: | --- | --- | --- |
| 5 | `[]` | no collision | `[5]` |
| 10 | `[5]` | same direction | `[5,10]` |
| -5 | `[5,10]` | 10 is larger, discard -5 | `[5,10]` |

The final survivors are `[5,10]`.

## Complexity

- Time: O(n), because every asteroid is appended once and popped at most once.
- Space: O(n), for the survivor stack and Java's final copied array.

## Edge cases

Asteroids moving in the same direction never collide.
Equal opposite sizes remove both.
A negative asteroid can destroy several smaller positive survivors before stopping.
A negative asteroid at the beginning has no collision partner.

## Common mistakes

- Comparing an incoming left mover with earlier negative values creates impossible collisions.
- Popping a larger survivor destroys the wrong asteroid.
- Appending an incoming asteroid after it loses allows a destroyed object to survive.

## Language notes

Python uses a dynamic list as the stack.
Java uses a preallocated `int[]` with `survivorCount` and copies the active prefix for the returned array.
Both references preserve the original input order among survivors.
