## Intuition

For each house, find its nearest heater.
That distance is the smallest radius capable of covering that house.
All heaters share one radius, so the answer is the maximum of those per-house requirements.
Sorting lets us locate the nearest heaters without searching the entire heater array repeatedly.

## Brute force

For each house, examine every heater and retain the smallest absolute distance.
Take the maximum of these distances.
This costs `O(nm)` time for `n` houses and `m` heaters, which is too expensive when both arrays are large.
It is a simple independent oracle for small examples.

## Approach

Sort `houses` and `heaters` in increasing order.
Maintain an index named `heater`, initially zero.
For each house, advance this index while the next heater is at least as close as the current one.
When advancing no longer helps, record the current distance and update `radius`.

The nearest heater index never needs to move left as houses move right.
For a fixed house, distances decrease as heaters approach it and increase once they move past it.
Consequently, stopping at the first worsening distance selects a nearest heater.
Using a less-than-or-equal comparison also moves past duplicate heater positions and tied distances safely.
The pointer moves at most `m - 1` times over the whole scan.

## Walkthrough

For Example 1, the sorted houses are `[1, 2, 3]` and the only heater is at 2.
The first house has distance one, so `radius` becomes one.
The second house has distance zero and does not increase the radius.
The final house also has distance one.
The answer remains one, which reaches both outer houses.
No smaller radius could cover either outer house, proving minimality for this example.

## Complexity

Sorting costs `O(n log n + m log m)` time.
The subsequent scan costs `O(n + m)` time and uses `O(1)` auxiliary space.
The complete algorithm also uses library sorting memory: Python may need linear temporary space, while Java's primitive-array sorting uses its own implementation-dependent workspace.
Both references reorder the input arrays, as the statement permits.

## Edge cases

A house exactly on a heater needs radius zero.
All houses may lie to one side of every heater.
Duplicate houses and heaters do not change the distance rule.
Unsorted inputs must be sorted before applying the pointer invariant.

## Common mistakes

Taking the minimum distance over all houses leaves farther houses uncovered.
Assuming the nearest heater is always on the left misses better heaters on the right.
Moving the pointer for every house without checking distances loses the monotonic invariant.

## Language notes

Java uses `Arrays.sort` and `Math.abs`.
The specified coordinate range keeps subtraction within signed integer bounds.
Python sorts the supplied lists in place and uses `abs` for the same distance calculation.
