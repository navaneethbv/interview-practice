## Intuition

A proposed runtime `t` is feasible when the batteries can collectively supply `n * t` minutes after each battery is capped at `t`.
That predicate is monotone, so binary search finds the largest feasible runtime.

## Brute force

Simulating battery swaps minute by minute can take time proportional to the answer, which may be very large.
Capacity capping evaluates a candidate runtime without constructing a schedule.

## Approach

1. Set the upper bound to total battery capacity divided by `n`.
2. Test the midpoint by summing `min(battery, middle)`.
3. Keep the upper half when available capacity reaches `n * middle`, otherwise discard it.
4. Return the final feasible `left`.

## Walkthrough

For Example 1, three batteries of capacity 3 provide total capacity 9 for two computers.
Runtime 4 needs 8 capped minutes, and each battery contributes 3, so 9 is sufficient.
Runtime 5 needs 10 minutes but the batteries contribute only 9, so the maximum is `4`.

## Complexity

Each binary-search check scans `m` batteries, giving `O(m log(total/n))` time.
The references use `O(1)` extra space.

## Edge cases

For one computer, all battery capacity can be used sequentially, as Example 2 demonstrates.
A battery larger than the candidate runtime contributes only the candidate runtime because it cannot power multiple computers simultaneously.

## Common mistakes

- Summing uncapped batteries overestimates how much one battery can contribute to a simultaneous runtime.
- Using a lower midpoint can stall an upper-bound search.
- Dividing total capacity by the wrong number of computers gives an invalid upper bound.

## Language notes

Python integers grow automatically, while Java accumulates capacities and products in `long`.
Both methods return the `long` runtime required by the specification.
