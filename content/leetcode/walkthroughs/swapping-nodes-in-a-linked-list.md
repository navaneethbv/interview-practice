## Intuition
The node k positions from the end can be found by keeping a fixed gap between two pointers.
First locate the kth node from the front, then move a runner from it to the end while another pointer starts at the head.
When the runner reaches the final node, the second pointer is at the matching node from the end.

## Brute force
We could count the list length, compute the zero-based position from the end, then scan from the head to both positions.
That takes O(N) time but makes two separate positional calculations.
The gap method also takes linear time while using the list structure directly.

## Approach
1. Advance `first` by `k - 1` links to reach the kth node from the beginning.
2. Set `runner` to `first` and `second` to the head.
3. Move both pointers until `runner.next` is null.
4. Swap the two node values and return the unchanged head.

## Walkthrough
Example 1 is `[1, 2, 3, 4, 5]` with `k = 2`.
The first pointer lands on value 2.
The runner begins there, and the second pointer begins at value 1.
Moving both pointers three times leaves the runner at value 5 and the second pointer at value 4.
Swapping values 2 and 4 produces `[1, 4, 3, 2, 5]`.

## Complexity
The first advance and paired scan together visit O(N) links.
Only pointer variables and one temporary value are used, so extra space is O(1).

## Edge cases
When k is one, the head value swaps with the tail value.
When both positions are the same middle node, swapping the value with itself changes nothing.
The input guarantees k is within the list length.

## Common mistakes
Using zero-based k without subtracting one selects the wrong first node.
Moving only the second pointer after locating the first loses the positional gap.
Rebuilding the list is unnecessary and can break the required node identity.

## Language notes
Python and Java mutate the supplied node values and return the original head.
The Java reference uses the harness-provided `ListNode` with field `val`.
Neither implementation needs recursion, which keeps behavior safe for 100000 nodes.
