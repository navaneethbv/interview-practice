## Intuition

If `k` tasks can be assigned, the easiest `k` tasks and strongest `k` workers are sufficient candidates.
Binary search tests `k`, while a deque greedily gives each worker the easiest task without a pill or the hardest currently feasible task with a pill.

## Brute force

Trying task-worker matchings and pill choices is exponential.
The monotone feasibility of assigning a larger number of tasks supports binary search over the answer.

## Approach

1. Sort tasks and workers.
2. Binary-search the largest feasible task count.
3. For a candidate, process the strongest workers and enqueue tasks they could do with a pill.
4. Use the easiest queued task without a pill; otherwise use a pill on the hardest queued task.
5. Reject when the queue is empty or no pill remains for an otherwise impossible worker.

## Walkthrough

For Example 1, tasks are `[1, 2, 3]`, workers are `[0, 3, 3]`, and one pill adds 1 strength.
The worker at 0 takes task 1 with the pill, the first worker at 3 takes task 2, and the other worker at 3 takes task 3 directly.
All three tasks can be assigned, so the answer is `3`.

## Complexity

Sorting costs `O(t log t + w log w)`, and each binary-search feasibility check costs `O(k)` deque work.
Overall time is `O((t + w) log(t + w) + min(t,w) log(min(t,w)))`, with `O(min(t,w))` queue space plus the sorted task and worker storage used by the references.

## Edge cases

With no usable pill, every selected task must meet its worker directly.
A pill can be used at most once per worker and the total pill count limits boosted assignments.

## Common mistakes

- Giving a pill to the easiest task when a direct assignment exists wastes scarce strength.
- Testing arbitrary tasks instead of the easiest `k` can reject a feasible assignment.
- Assuming feasibility is nonmonotone makes binary search invalid.

## Language notes

Python uses `deque`, while Java uses `ArrayDeque<Integer>`.
Both widen worker-plus-strength comparisons to avoid integer overflow.
