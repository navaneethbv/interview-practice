## Intuition

The best jump choices depend on how many landing years are actually reached.
For every prefix, retain its k largest gaps as jumps, compute the aging needed to reach its endpoint, and spend any remaining age allowance by living forward.

## Brute force

Re-sorting every prefix's gaps would take quadratic sorting work.
A bounded min heap updates the largest-k selection as one new gap arrives.

## Approach

Initialize best to the starting year plus maxAging, covering a journey with no jumps.
For each new landing point, push its preceding gap into `jumped` and add it to `jumped_total`.
If the heap exceeds k entries, remove its smallest gap and subtract that saving.
Minimum age used for this prefix is endpoint minus start minus jumped_total.
When affordable, its latest reachable year is endpoint plus the remaining age allowance.
Take the maximum across prefixes.

## Walkthrough

```text
Input: points = [2020, 2024], k = 1, maxAging = 1
Output: 2025
```

Example 1 starts at 2020 with one aging year, so the initial best is 2021.
The four-year gap to 2024 enters the one-slot heap and is entirely skipped by the jump.
Aging used to reach 2024 is therefore zero.
The remaining one year can be lived after the last landing point, improving best to 2025.

## Complexity

Each of n - 1 gaps performs heap work on at most k + 1 entries.
Time is O(n log(k + 2)), and extra space is O(k + 1).
The code examines all prefixes even after an unaffordable one.

## Edge cases

With no jumps, the answer is start plus maxAging.
Unused aging can extend beyond the final landing year.
Some journeys may stop between landing points.

## Common mistakes

Checking only whether the final landing point is reachable misses the best partial journey.
Subtract a removed gap from jumped_total when maintaining heap size.

## Language notes

Python uses heapq for the smallest retained jump.
Java uses `PriorityQueue<Long>` and long year calculations so the final year safely includes both calendar position and additional aging.
