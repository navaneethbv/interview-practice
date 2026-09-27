# Maximum Running Time of N Computers

Keep n computers running simultaneously using batteries whose capacities are measured in whole minutes.
A battery can power only one computer at a time, but may be swapped between computers at integer times without delay.
Batteries cannot recharge.
Return the maximum number of minutes all computers can run together.

## Examples

### Example 1

```text
Input: n = 2, batteries = [3, 3, 3]
Output: 4
Explanation: Rotate the three batteries so two computers share eight minutes of total capacity.
```

### Example 2

```text
Input: n = 1, batteries = [2, 3, 4]
Output: 9
Explanation: One computer can use all batteries sequentially.
```

## Constraints

- 1 <= n <= batteries.length <= 100000.
- 1 <= batteries[i] <= 1000000000.
