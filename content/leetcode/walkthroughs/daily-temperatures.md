## Intuition

A day stays unresolved until the first strictly warmer day appears.
When today's temperature exceeds several unresolved temperatures, today answers all of them at once.
A monotonic stack stores those unresolved days in nonincreasing temperature order.

## Brute force

For each day, scan all following days until finding a warmer one.
A decreasing sequence makes every scan reach the end, producing O(n²) time.
The stack shares this search work across all days.

## Approach

1. Initialize `result` with zeros and an empty stack named `pending`.
2. Scan temperatures from left to right, tracking each `index`.
3. While today's temperature is greater than the temperature at the top pending index, pop that `previous` index.
4. Store `index - previous` as its waiting time.
5. Push today's index after resolving all strictly cooler pending days.
6. Return `result`; unresolved entries already contain zero.

The popped day's warmer answer is the first possible one: every earlier processed day failed to resolve it.
Equal temperatures remain pending because equality does not satisfy the problem.
Store indices so both the prior temperature and the waiting distance remain available.

## Walkthrough

Example 1 is `[60, 65, 63, 70]`.
The stack is shown from oldest entry to newest.

| `index` | Temperature | Resolved indices | `pending` afterward |
| --- | --- | --- | --- |
| 0 | 60 | None | `[0]` |
| 1 | 65 | 0 waits 1 day | `[1]` |
| 2 | 63 | None | `[1, 2]` |
| 3 | 70 | 2 waits 1 day; 1 waits 2 days | `[3]` |

Index 3 has no warmer future day.
The resulting array is `[1, 2, 1, 0]`.

## Complexity

- Time: O(n), because every index is pushed once and popped at most once, despite the nested loop.
- Space: O(n) auxiliary stack storage, plus O(n) for the output.

## Edge cases

An all-equal or decreasing sequence leaves every result zero.
An increasing sequence resolves each day on the next iteration.
A single day has no future warmer day and therefore returns `[0]`.

## Common mistakes

- Popping equal temperatures treats a merely equal day as warmer.
- Storing values alone loses the index distance required by the answer.
- Claiming quadratic time from the nested loop ignores that popped indices never return.

## Language notes

Python uses a list with `append` and `pop`.
Java uses `ArrayDeque<Integer>` with `push`, `peek`, and `pop` at the same end.
Both references initialize the result to zero, so they need no separate cleanup pass for unresolved days.
