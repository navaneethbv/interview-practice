## Intuition

The output alternates between zero and the next number, and the next number alternates between odd and even. Zero decides who goes next.

## Approach

1. Give `zero` the first turn.
2. For i = 1..n, `zero` waits for its turn, prints 0, and hands the turn to `odd` if i is odd, otherwise to `even`.
3. `odd` prints 1, 3, 5, ... and `even` prints 2, 4, ..., each waiting for its turn and handing it back to `zero`.

## Walkthrough

For `n = 3`: zero prints 0 and wakes odd, which prints 1; zero prints 0 and wakes even, which prints 2; zero prints 0 and wakes odd, which prints 3. Output `010203`.

## Complexity

- Time: O(n).
- Space: O(1).

## Edge cases

- `n = 1`: the even thread loops zero times and must still finish.
- Each number thread knows in advance how many numbers it prints.

## Common mistakes

- Letting the even thread loop `n / 2 + 1` times, so it waits forever for a turn that never comes.
- Using a single condition without recording whose turn it is.

## Language notes

Java: three semaphores. C++: a shared `next` value (0 means zero's turn). Go: three channels with capacity 1.
