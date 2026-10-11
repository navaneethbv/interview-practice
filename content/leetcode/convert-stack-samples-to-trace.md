# Convert Stack Samples to Trace Events

A sampling profiler records the call stack of a program at increasing `timestamps`; `stacks[i]` lists the active functions at `timestamps[i]`, outermost first.
Convert the samples into trace events. A function call is assumed to start at the first sample where its frame appears and to end at the first sample where it is gone.
Two consecutive samples share a frame at depth `d` only if they agree on every function from depth 0 through `d`; the same function name at a different depth, or under a different caller, is a different call.
Emit `"B <name> <time>"` when a call begins and `"E <name> <time>"` when it ends. At each sample, emit the ends first (innermost call first), then the begins (outermost first).
After the last sample, end every call still open at the last timestamp, innermost first.

## Constraints

- 1 <= timestamps.length <= 10^4
- timestamps are strictly increasing
- 0 <= stacks[i].length <= 100

## Examples

### Example 1

```text
Input: timestamps = [0, 1, 2, 3], stacks = [["main"], ["main", "parse"], ["main", "eval"], ["main"]]
Output: ["B main 0", "B parse 1", "E parse 2", "B eval 2", "E eval 3", "E main 3"]
Explanation: parse runs from 1 to 2 and eval from 2 to 3; main stays open until the end.
```

### Example 2

```text
Input: timestamps = [1, 2], stacks = [["main", "f", "f"], ["main", "f"]]
Output: ["B main 1", "B f 1", "B f 1", "E f 2", "E f 2", "E main 2"]
Explanation: Recursion: the inner f ends at 2 while the outer f continues.
```
