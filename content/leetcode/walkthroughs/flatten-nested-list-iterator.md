## Intuition
The next integer is the leftmost integer in the nested structure.
A stack can hold pending values in reverse order so its top is always the next item to expose.

## Brute force
A naive constructor could recursively flatten the entire input into an array before serving requests.
It takes O(N) time and O(N) stored output space for N nested items.
That also performs work for integers the caller may never request.

## Approach
1. Push the top-level list in reverse order.
2. Before answering `hasNext`, expand a list at the stack top in reverse order.
3. Stop when the top is an integer or the stack is empty.
4. Let `next` normalize the stack with `hasNext`, then pop the integer.

## Walkthrough
Example 1 starts with `[[1, 1], 2, [1, 1]]`.
The reversed stack places the final list at the bottom, `2` above it, and the first list at the top.
The first `hasNext` expands the first list and exposes its first `1`.
The first two `next` calls pop the two ones.
The next call expands no list because `2` is already on top, then returns `2`.
The final list is expanded and returns its two ones.
A last `hasNext` finds an empty stack and returns `false`.

## Complexity
Every nested list is expanded once and every integer is popped once, so a complete traversal costs O(N) time.
The stack uses O(D) space for pending nodes, where D is the maximum nesting depth plus pending siblings.
No complete flattened copy is created.

## Edge cases
Empty lists are skipped repeatedly.
A deeply nested single integer remains safe because work is iterative.
Calling `hasNext` many times does not consume an integer.

## Common mistakes
Pushing children in forward order reverses the output.
Calling `getInteger` on a list raises an invalid access.
Flattening only one nesting level misses deeper lists.

## Language notes
Python stores the supplied nested wrapper objects in a list.
Java uses the harness supplied `NestedInteger` and a `Deque` without redefining either type.
