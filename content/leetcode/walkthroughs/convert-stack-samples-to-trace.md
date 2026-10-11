## Intuition

Between two samples, the calls that continue are exactly the common prefix of the two stacks: a frame survives only if everything above it on the stack is unchanged. Everything below the prefix in the old stack ended, and everything below it in the new stack began.

## Approach

1. Track the previous stack, initially empty.
2. For each sample, find the length of the common prefix with the previous stack.
3. Emit end events for the old frames past the prefix, innermost first.
4. Emit begin events for the new frames past the prefix, outermost first.
5. After the last sample, end all open frames at the last timestamp.

## Walkthrough

In Example 1, main begins at 0 and parse at 1. At 2 the common prefix is [main], so parse ends and eval begins. At 3 eval ends. After the last sample, main ends at 3.

## Complexity

- Time: O(total stack depth).
- Space: O(max depth).

## Edge cases

- An empty stack ends every open call.
- A function that moves to a different caller is a new call.
- Recursive calls of the same function are separate frames.

## Common mistakes

- Matching frames by name only, which merges recursive or re-entered calls.
- Emitting begins before ends at the same timestamp, which produces overlapping events.
- Forgetting to close frames after the final sample.
