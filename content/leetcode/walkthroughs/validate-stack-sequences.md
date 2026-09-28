## Intuition
When the stack's top equals the next requested pop, removing it immediately cannot hurt a valid solution.
Any newer value pushed above it would eventually have to be removed before that same pop could happen.
This observation turns a search over interleavings into a greedy stack simulation.

## Brute force
Enumerate possible choices to push or pop and compare each produced pop sequence with the target.
There are at most two choices across up to 2n operations, giving a loose O(n*4^n) exhaustive bound including sequence checks.
The greedy simulation avoids exploring alternative schedules.

## Approach
1. Create an empty stack and set `next_pop` to zero.
2. Push the next value from `pushed`.
3. While the stack top matches the next requested value, pop it and advance the requested-pop index.
4. After all pushes, return whether the stack is empty.

The local contract guarantees distinct pushed values and that `popped` is a permutation of them.
Consequently, an empty final stack also means every requested pop was matched.
If the next requested value is blocked by a different top value, only a future push might help; removing the blocker would violate the target order.

## Walkthrough
Example 1 has `pushed = [1,2,3]` and `popped = [2,3,1]`.
Push 1; it does not match the requested 2, so the stack stays `[1]`.
Push 2, then immediately pop 2 and advance the requested value to 3.
Push 3, then pop 3.
The next requested value is now 1, which is already on top, so the same loop pops it too.
The stack ends empty and the result is true.

## Complexity
Each of n values is pushed once and popped at most once, so total time is O(n).
The nested loop does not multiply the cost because no value can be removed twice.
The stack uses O(n) auxiliary space in the worst case.

## Edge cases
A single equal push/pop value succeeds.
The reverse of the push order succeeds after all values accumulate on the stack.
In Example 2, popping 3 exposes 2 while the target asks for 1, so the blocked stack remains nonempty.

## Common mistakes
- Popping a nonmatching top changes the required output order.
- Checking for just one pop after each push misses several consecutive matches.
- Comparing the arrays as sets ignores the ordering constraint.

## Language notes
Python uses a list's append and pop operations.
Java uses `ArrayDeque<Integer>` as a stack; comparison with the primitive target unboxes the top value.
