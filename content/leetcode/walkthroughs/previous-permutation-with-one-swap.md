## Intuition

To stay as large as possible while getting smaller, change the array as far to the right as possible. The rightmost position i where arr[i] > arr[i + 1] is the latest place a swap can decrease the array. Swap it with the largest value to its right that is still smaller, and among equal copies of that value take the leftmost, so the larger value moves as far right as possible.

## Approach

1. Find the rightmost i with arr[i] > arr[i + 1]; if none, return arr.
2. Scan from the end for the first value smaller than arr[i].
3. Move left over equal copies of that value.
4. Swap.

## Walkthrough

In [1, 9, 4, 6, 7], the rightmost descent is at 9. The largest smaller value to its right is 7, so the result is [1, 7, 4, 6, 9].

## Complexity

- Time: O(n).
- Space: O(1).

## Edge cases

- A non-decreasing array has no smaller permutation by one swap.
- With duplicates such as [3, 1, 1, 3], swap with the first 1: [1, 3, 1, 3].

## Common mistakes

- Swapping with the rightmost copy of the value, which yields a smaller result.
- Picking the leftmost descent.
