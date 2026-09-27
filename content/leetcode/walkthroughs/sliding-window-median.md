## Intuition

A median needs the lower half and upper half of the current window to stay ordered.
The Python reference keeps one sorted list, while Java keeps two counted ordered maps because duplicate values need multiplicities.
Balancing the two sides makes the largest lower value and smallest upper value the median candidates.

## Brute force

Sorting every length-k window independently costs O((n-k+1) × k log k) time.
It also repeatedly sorts values that overlap between adjacent windows.
Maintaining ordered window state avoids rebuilding each window from scratch.

## Approach

1. In Java, insert each new value into the lower or upper counted ordered map.
2. Remove nums[index-k] when the window becomes too large.
3. Move boundary values until lower has either the same size as upper or one extra value.
4. Use lower's maximum for odd k.
5. Average lower's maximum and upper's minimum for even k.
6. Store each median in `medians`.

Python starts with the first sorted window, records its middle value or pair, removes one outgoing occurrence with `bisect_left`, and inserts the incoming value with `insort`.
Its list stays sorted directly, so it does not need the two-map rebalancing steps.

## Walkthrough

Example 1 uses nums = [1,4,2,3] and k = 3.

| window | ordered values | median |
| --- | --- | ---: |
| [1,4,2] | [1,2,4] | 2.0 |
| remove 1, add 3 | [2,3,4] | 3.0 |

The returned medians are [2.0, 3.0].
In Java, equal values are counted in TreeMap entries rather than treated as one item.

## Complexity

Let n be nums length and k be the window size.
Python insertion and removal in a list cost O(k), so its total time is O(nk) after the initial O(k log k) sort.
Java map updates and rebalancing give O(n log(k + 1)) time, including the k = 1 case.
Python stores O(k) values and Java stores O(k) counted values, while result storage is O(n-k+1).

## Edge cases

A window of one returns each original value as a floating point median.
An even window averages two values and must avoid integer division.
Duplicate values require counts so removal deletes only one occurrence.
Large positive and negative values require widening before Java addition for an even median.

## Common mistakes

- Removing by value without tracking multiplicity can delete too many duplicates.
- Forgetting to rebalance after removal leaves the median on the wrong side.
- Averaging integer values before converting to double truncates halves.
- Using only a min heap or max heap cannot support arbitrary outgoing values efficiently.

## Language notes

Python's bisect keeps a sorted list and list insertion shifts values, which explains its O(k) update cost.
Java's TreeMap stores value frequencies and maintains ordered lower and upper halves.
The Java median casts the lower value before adding the upper value to avoid signed integer overflow.
