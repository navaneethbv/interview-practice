## Intuition

The circular arrangement adds one constraint: the first and last houses cannot both be selected.
Every valid selection therefore excludes at least one of those endpoints.
Solve the straight-street problem once without the last house and once without the first, then take the better result.

## Brute force

Enumerate subsets and reject any that include neighboring houses, including the circular endpoint pair.
This takes exponential time.
Breaking the circle into two linear ranges permits the same rolling DP used for a straight street.

## Approach

1. If there is one house, return its value directly.
2. Run `linear` (`_linear` in Python) over indices zero through n minus two.
3. Run the same helper over indices one through n minus one.
4. In each helper, compare skipping a house with taking it plus the best total two positions earlier.
5. Return the maximum of the two range results.

The ranges use an exclusive `end` index.
A selection excluding both endpoints may be considered in both ranges, which is harmless because only a maximum is requested.
No valid selection is omitted, since choosing both endpoints is forbidden.

## Walkthrough

Example 1 uses `nums = [4, 1, 3]`.

| Range | House processed | `older` afterward | `previous` afterward |
| --- | --- | --- | --- |
| Exclude last: `[4, 1]` | 4 | 0 | 4 |
| Exclude last: `[4, 1]` | 1 | 4 | 4 |
| Exclude first: `[1, 3]` | 1 | 0 | 1 |
| Exclude first: `[1, 3]` | 3 | 1 | 3 |

The two range answers are 4 and 3, so return 4.
The seemingly attractive sum `4 + 3` is invalid because those houses are neighbors around the circle.

## Complexity

- Time: O(n), for two linear scans.
- Space: O(1), because the helpers traverse index ranges without copying subarrays.

## Edge cases

The singleton guard prevents both ranges from excluding the only house.
With two houses, each range contains exactly one, so the larger value wins.
Zero values and ties need no special policy because the output is only the maximum total.

## Common mistakes

- Applying the linear algorithm to the full array permits both endpoints.
- Summing the two range results combines incompatible alternatives.
- Using slices without accounting for their allocation misstates auxiliary space.

## Language notes

Both references pass the original array with `start` and exclusive `end` indices.
Python names the transition temporary `next_total`, while Java uses `next`; both preserve the old states before updating them.
The maximum permitted total fits Java `int`.
