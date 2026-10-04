## Intuition

The desired good prefix and suffix are everything outside one middle interval.
With k boosts, at least `totalBad - k` bad days must remain unboosted inside that interval.
Maximizing the retained ends is therefore equivalent to minimizing a middle interval containing enough bad days.

## Brute force

Try every prefix and suffix length, count their bad days, and keep the largest feasible nonoverlapping total.
There are quadratically many boundary pairs.

## Approach

Compute `must_keep`, the total number of bad days minus k.
If it is nonpositive, every day can become good, so return n once rather than double-counting overlapping ends.
Otherwise slide a window across sales while maintaining its count `bad`.
As long as removing its leftmost day would still leave at least must_keep bad days, remove that day.
For each right boundary with enough bad days, record the shortest such middle window.
Return n minus that shortest length.
All bad days outside the selected middle can be boosted within budget, making both outer pieces good.

## Walkthrough

Example 1 contains five bad days and allows two boosts, so the middle must retain at least three bad days.
Indices one through three are three consecutive bad days and form a shortest qualifying middle of length three.
Boosting the bad days at indices five and six makes the suffix from index four through seven good.
Together with the initial good day, the good ends contain one plus four days.
The answer is `8 - 3 = 5`.

## Complexity

Both references scan the input to count bad days and then move each window pointer forward at most n times.
Time is O(n), and auxiliary space is O(1).

## Edge cases

An empty array returns zero.
A budget covering every bad day returns n, including when the input is already all good.
A day with exactly ten sales is good.

## Common mistakes

Do not count overlapping prefix and suffix days twice.
The complement window must contain unboosted bad days, so its target is totalBad minus k, not k.

## Language notes

Python adds Boolean bad-day tests to counters.
Java uses conditional increments and an explicit ternary expression when testing whether the leftmost day can leave.
