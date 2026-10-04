## Intuition

Count the digit two separately at each decimal position.
At a fixed position, complete cycles contribute a predictable number of twos, while the final partial cycle depends on the current digit and the lower suffix.
Adding these contributions counts repeated twos in one number correctly.

## Brute force

Visit every integer from zero through n, convert it to decimal, and count its twos.
This costs O(n log n) digit work, which is unnecessary when entire numeric cycles can be counted together.

## Approach

For each decimal `power`, split n into `higher`, `current`, and `lower` portions.
Every complete higher-prefix cycle contributes `power` occurrences.
If current is below two, add only `higher * power`.
If current equals two, also add `lower + 1` for the partial cycle including n.
If current exceeds two, a full additional block of `power` occurrences has completed.
Multiply power by ten and repeat.

## Walkthrough

Example 1 is n equal to 25.
At the units position, higher is 2 and current is 5, so three complete occurrences contribute: 2, 12, and 22.
At the tens position, higher is zero, current is 2, and lower is 5.
The numbers 20 through 25 contribute six tens-position twos.
The total is `3 + 6 = 9`; 22 correctly contributes at both positions.

## Complexity

For d decimal digits, time is O(d), equivalently O(log(n + 1)).
Auxiliary space is O(1), since each position uses only arithmetic state.
No list of individual numbers is generated.

## Edge cases

Zero contributes no twos and skips the loop.
A current digit exactly equal to two requires the inclusive `lower + 1` term.
Powers of ten simply introduce another position to examine.

## Common mistakes

Counting numbers containing a two is different from counting occurrences of the digit.
Dropping the plus one misses the upper endpoint in an exact-two partial cycle.

## Language notes

Python uses arbitrary-precision arithmetic.
Java keeps power and intermediate totals in long variables so multiplying a place value by ten does not overflow int during the calculation.
