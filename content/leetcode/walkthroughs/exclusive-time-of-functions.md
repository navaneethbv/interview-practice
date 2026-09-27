## Intuition

Nested logs describe a call stack on one processor.
The top function owns the time since the previous event, and a start or end event changes which function owns the next second.
End timestamps are inclusive, so closing a function adds one to its elapsed interval.

## Brute force

A naive method could expand every timestamp into running function labels and count them.
That may require O(T) time and space for the largest timestamp span, even though the logs contain only O(L) events.
Stack accounting uses the event boundaries directly.

## Approach

1. Keep durations, a call_stack, and previous_time.
2. At a start, charge elapsed time to the current top before pushing the new function.
3. At an end, pop the function and charge through its inclusive timestamp.
4. Set previous_time to the next uncharged second after every event.
5. Return durations after all nested calls close.

## Walkthrough

Example 1 uses logs [0:start:0, 1:start:2, 1:end:5, 0:end:6].

| log | stack after event | durations | previous_time |
| --- | --- | --- | ---: |
| 0:start:0 | [0] | [0,0] | 0 |
| 1:start:2 | [0,1] | [2,0] | 2 |
| 1:end:5 | [0] | [2,4] | 6 |
| 0:end:6 | [] | [3,4] | 7 |

Function 0 owns seconds 0,1,6, while function 1 owns seconds 2 through 5.

## Complexity

Let L be the number of logs, T their total character count, and M the longest log length.
Initializing `durations` and parsing each log once takes O(n + T) time.
The call stack, duration array, and current parsed fields use O(L + n + M) space.
The timestamp values do not require expanding the elapsed interval.

## Edge cases

A start and end at the same timestamp contributes one second.
A function can call itself and therefore appear multiple times on the stack.
A top-level function resumes at the next second after a child ends.
Valid nested input guarantees every end event has a matching stack entry.

## Common mistakes

- Charging an end interval without the inclusive plus one loses the final second.
- Forgetting to charge the parent before a child starts overcounts the parent.
- Setting previous_time to the end timestamp instead of timestamp plus one overlaps work.
- Using only the current function id loses nested ownership.

## Language notes

Python splits each log into text fields and uses a list stack.
Java uses `List<String>`, split, and ArrayDeque with int timestamps.
Both maintain the same previous_time invariant and return an int array or list of durations as required.
