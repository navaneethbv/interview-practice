## Intuition

If the smaller group size is `s`, every group must have size `s` or `s + 1`.
For a value appearing `count` times, the formula `(count + s) // (s + 1)` gives the fewest groups that can fit while checking whether their minimum total size is valid.

## Brute force

Trying arbitrary group sizes and partitions of every occurrence is exponential.
The frequency counts reduce the problem to testing candidate smaller sizes from the smallest frequency down.

## Approach

1. Count each value's frequency.
2. Try `smaller_size` from the minimum frequency down to one.
3. For each frequency, calculate its group count and reject the candidate if `groups * smaller_size > frequency`.
4. Return the sum of group counts for the first valid candidate.

## Walkthrough

For Example 1, values 3 and 2 have frequencies 3 and 2.
Trying smaller size 2 gives one group for frequency 3 and one group for frequency 2.
Their sizes are 3 and 2, which differ by one, so the total group count is `2`.

## Complexity

Counting frequencies takes `O(n)` time, and trying `u` values across at most the minimum frequency gives `O(uf)` worst-case time, bounded by the input scale here.
The frequency map uses `O(u)` space.

## Edge cases

A value occurring once forces the candidate smaller size to be tested down to one.
A frequency can split into several groups as long as each group has one of the two allowed sizes.

## Common mistakes

- Using only `count // smaller_size` can leave an invalid remainder.
- Testing candidates upward returns a valid but nonminimal group count.
- Requiring all groups to have exactly the same size rejects legal size differences of one.

## Language notes

Python uses `Counter`, while Java uses `HashMap.merge` and `Collections.min`.
The references use integer arithmetic and never materialize individual group contents.
