## Intuition

A new flower can be planted exactly when its plot and both neighboring plots are empty or outside the array.
Planting greedily at the first available plot cannot hurt later positions because it occupies the earliest possible location.
Mutating the flowerbed immediately makes the next neighbor check reflect the new flower.

## Brute force

Trying every subset of empty plots and checking adjacency can take exponential time.
A recursive search is unnecessary because the local planting rule is sufficient for a line of plots.

## Approach

1. Scan flowerbed from left to right.
2. Skip occupied plots.
3. Treat an outside neighbor as empty.
4. When both neighbors are empty, plant a flower and decrement n.
5. Return whether n is at most zero after the scan.

## Walkthrough

Example 1 uses flowerbed = [1,0,0,0,1] and n = 1.

| index | left available | right available | action | remaining n |
| ---: | --- | --- | --- | ---: |
| 0 | not checked | not checked | skip existing flower | 1 |
| 1 | no | yes | skip | 1 |
| 2 | yes | yes | plant | 0 |
| 3 | no | no | skip | 0 |
| 4 | not checked | not checked | skip existing flower | 0 |

The method returns true after planting at index 2.

## Complexity

Let n be the flowerbed length.
The scan checks each plot once, so time is O(n).
Only a few booleans and the remaining count are stored, giving O(1) auxiliary space.
The input flowerbed is mutated to represent newly planted flowers.

## Edge cases

A zero requested count always succeeds, but this implementation still scans and may plant additional flowers in the supplied array.
A one-plot empty bed can hold one flower.
The first and last plots have only one in-array neighbor.
Existing adjacent flowers are excluded by the input contract.

## Common mistakes

- Requiring two in-array neighbors rejects valid edge plantings.
- Delaying mutation allows adjacent new flowers incorrectly.
- Planting on an occupied plot changes existing flowers.
- Counting available zeros instead of checking both neighbors ignores adjacency.

## Language notes

Python uses boolean expressions with short circuiting for edge checks.
Java uses the same checks on an int array and decrements the parameter locally.
Neither implementation needs a copy of the flowerbed.
