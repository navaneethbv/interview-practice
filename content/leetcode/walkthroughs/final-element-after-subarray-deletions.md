## Intuition

Alice can choose which side of the current array survives her first useful deletion.
Bob can remove internal values later, but cannot force Alice's better endpoint below the larger of the original two endpoints.
The game therefore reduces to comparing the first and last entries.

## Brute force

Simulating every sequence of subarray deletions creates many states and obscures the endpoint invariant.
The optimal-play result needs only two values.

## Approach

1. Read the first and last array values.
2. Return their maximum.
3. The method avoids mutating the array because the game proof depends only on endpoints.

## Walkthrough

For Example 1, `[4,99,2]` has endpoint values 4 and 2.
Alice can delete the suffix `[99,2]` and leave 4 immediately.
If she deletes the first value instead, the remaining `[99,2]` lets Bob remove 99 and leave 2, while deleting only the middle leaves both endpoints for Bob to choose between.
The guaranteed optimal result is therefore 4.

## Complexity

The method performs O(1) time and O(1) auxiliary space.
It does not copy or sort the input array.

## Edge cases

A one-element array returns that element.
A two-element array returns the larger endpoint because Alice can remove the other element.
The middle values do not affect the final formula.
The result remains an original endpoint value, since deletions only join surviving pieces and never change a value.

## Common mistakes

Do not return the maximum of every array value.
Do not simulate arbitrary deletions as if both players maximize.
Use the original endpoints before any imagined deletion.

## Language notes

Python uses `nums[-1]` for the final element.
Java uses `nums.length - 1` explicitly.
