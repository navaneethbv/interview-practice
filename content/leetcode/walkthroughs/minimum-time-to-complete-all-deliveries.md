## Intuition

For a candidate finishing hour `t`, drone `i` can work `t - floor(t / r[i])` hours.
Both individual demand limits and the total number of non-recharging hours must hold, and feasibility is monotone in `t`.

## Brute force

Checking every hour and counting usable slots eventually reaches the answer but can require billions of checks.
Binary search uses the monotonic feasibility predicate instead.

## Approach

1. Compute the least common multiple of the recharge intervals.
2. Binary-search `left..right`, where the upper bound is twice the total deliveries.
3. For `middle`, count available hours for each drone and shared available hours.
4. Move left when all three demands fit, otherwise move right.

## Walkthrough

For Example 1, `d = [2, 1]` and `r = [2, 3]`.
At hour 3, drone 0 can use hours 1 and 3, while drone 1 can use hours 1 and 2, and three non-recharge slots exist overall.
The deliveries can be assigned to hours 1 and 3 for drone 0 and hour 2 for drone 1.
No smaller hour satisfies both demands, so the answer is `3`.

## Complexity

Each feasibility check is constant time, and binary search takes `O(log(sum(d)))` time.
The references use `O(1)` extra space.

## Edge cases

The least common multiple handles hours unavailable to both drones without double-counting them.
The answer may be much larger than either individual demand when both drones recharge on the same schedule.

## Common mistakes

- Counting only each drone's availability can assign the same hour to both.
- Using a product instead of an LCM overcounts shared recharge exclusions.
- Binary-searching an upper bound below the feasible answer breaks the monotone search.

## Language notes

Python integers are unbounded, while Java uses `long` for time, products, and counts.
The Java method returns the `long` required by the spec even though the input arrays use `int`.
