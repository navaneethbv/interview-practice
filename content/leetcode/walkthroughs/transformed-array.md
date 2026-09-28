## Intuition

Each output uses the original array and wraps the destination index circularly.
Adding `nums[index]` to `index` works for both positive and negative movement, while modulo normalizes the result.

## Brute force

Repeatedly stepping one position for every movement costs `O(sum(abs(nums[i])))` time.
Direct modular indexing computes every destination in constant time.

## Approach

1. Store the array length as `size`.
2. For each index and value, calculate `(index + value) % size`.
3. Read from the original `nums` at that wrapped index and write it to the result.

## Walkthrough

For Example 1, `nums = [1, 2, 0]`.
Index 0 moves to `(0 + 1) % 3 = 1`, yielding 2.
Index 1 moves to `(1 + 2) % 3 = 0`, yielding 1, and index 2 stays at 2 with value 0.
The result is `[2, 1, 0]`.

## Complexity

Each index is processed once, so time is `O(n)`.
The returned result uses `O(n)` space, while reads always use the unchanged input.

## Edge cases

Zero movement returns the same position.
Negative values wrap toward the left, and Java's `floorMod` handles negative indices safely.

## Common mistakes

- Reading from a partially written result makes outputs depend on iteration order.
- Using `%` directly in Java can leave a negative index.
- Moving by repeated single steps wastes time when values are large.

## Language notes

Python's nonnegative modulo and Java's `Math.floorMod` both normalize circular destinations.
The input length is at least one, so modulo by `size` is safe.
