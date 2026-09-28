## Intuition
For each node, the answer is the first later value strictly larger than it.
As we scan the list from left to right, unresolved nodes form a decreasing stack of indices.
When a larger value arrives, it resolves every stack top smaller than that value.

## Brute force
For every node, scan forward until finding a larger value.
This can take O(N squared) time on increasing or mostly decreasing inputs.
The monotonic stack resolves each node once.

## Approach
1. Copy the linked-list values into an array so indices can represent node positions.
2. Keep indices whose next greater value has not been found on a decreasing stack.
3. For each current value, pop smaller stack values and assign the current value as their answer.
4. Push the current index, leaving equal values unresolved until a strictly larger value appears.

## Walkthrough
Example 1 is `[2, 1, 5]`.
Index 0 with value 2 enters the stack, then index 1 with value 1 enters behind it.
At value 5, index 1 is popped and receives 5, then index 0 is popped and also receives 5.
Index 2 remains on the stack because no later value exists, so its default answer stays 0.
The result is `[5, 5, 0]`.

## Complexity
Building the values and scanning them take O(N) time.
Each index is pushed and popped at most once, and the values, stack, and result use O(N) space.

## Edge cases
A single node has no later value and returns zero.
Equal values do not resolve one another because the comparison is strict.
A decreasing list leaves every stack entry unresolved and returns all zeroes.

## Common mistakes
Popping equal values changes strictly larger into larger-or-equal.
Scanning the list repeatedly loses the linear-time guarantee.
Forgetting the default zero leaves unresolved entries undefined.

## Language notes
Python stores stack indices in a list and uses `pop` from its end.
Java uses an `ArrayDeque<Integer>` and keeps the provided linked-list `val` field unchanged.
The result is an array because the judge serializes answers by original list position.
