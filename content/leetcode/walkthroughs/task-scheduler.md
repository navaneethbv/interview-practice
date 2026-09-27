## Intuition

The most frequent task forces the longest chain of cooldown gaps.
Arrange its copies as anchors, then use other tasks to fill the gaps.
If enough other work exists to eliminate every idle slot, the answer is simply the number of tasks.

## Brute force

Try possible execution orders and placements of idle slots, checking cooldown validity for each schedule.
The number of candidate orders grows factorially before idle placements are even considered.
Counting frequencies exposes a lower bound that can also be achieved, avoiding schedule enumeration.

## Approach

1. Count each letter's frequency in `counts`.
2. Let `maximum` be the largest frequency and `tied` the number of task types with that frequency.
3. Compute `minimum_length = (maximum - 1) * (n + 1) + tied`.
4. Return the larger of this bound and the total number of tasks.

There are `maximum - 1` gaps before the final occurrence of a most-frequent type, each requiring a frame of at least n + 1 slots.
The final group contains all `tied` most-frequent types, which explains the last term.
Other task types can fill the frame vacancies; when there are too many to fit, their presence lengthens the schedule to the task count instead of requiring idle slots.
This counting argument depends on tasks being freely reorderable and all taking one time unit.

## Walkthrough

Example 1 has tasks `["A", "A", "A", "B", "B"]` and cooldown `n = 2`.

| Quantity | Value |
| --- | --- |
| `counts` | A:3, B:2 |
| `maximum` | 3 |
| `tied` | 1 |
| Cooldown lower bound | `(3 - 1) * 3 + 1 = 7` |
| Task count | 5 |

Return `max(5, 7) = 7`.
A matching schedule is `A B idle A B idle A`, where successive A tasks have two intervening slots.

## Complexity

- Time: O(T), for T tasks, followed by constant-size scans of at most 26 frequencies.
- Space: O(1), because the uppercase-English alphabet bounds the count storage.

## Edge cases

With n = 0, every slot can execute work and the task count wins.
When several letters tie for maximum frequency, all contribute to `tied`.
When all tasks are distinct, no idle slots are needed regardless of cooldown.
The nonempty input guarantees a maximum frequency exists.

## Common mistakes

- Using n rather than n + 1 forgets the anchor's own execution slot.
- Omitting `tied` undercounts schedules with multiple most-frequent types.
- Returning only the frame bound can be smaller than the number of required executions.

## Language notes

Python uses `Counter`; Java uses an integer array indexed by letter.
Both calculate only the optimal length, not an actual ordering.
The stated limits keep the arithmetic within Java's signed integer range.
