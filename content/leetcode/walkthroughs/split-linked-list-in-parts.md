## Intuition
If the list has length n, every part gets `n // k` nodes and the first `n % k` parts receive one extra node.
A single pass can count the list, then cut exactly those sizes in order.

## Brute force
Repeatedly measuring or copying each part scans the same suffixes many times.
Counting once and relinking nodes is linear.

## Approach
1. Count the list length.
2. Compute base size and remainder with division.
3. For each part, save the current head and calculate its target size.
4. Walk to that part's tail, detach it, and continue from the following node.
5. Leave null heads for parts after the list ends.

## Walkthrough
For Example 1, length 3 and k 5 give base 0 and remainder 3.
The first three parts receive one node each, and the last two receive null, producing `[[1],[2],[3],null,null]`.
For length 5 and k 3, base 1 and remainder 2 give sizes 2,2,1.

## Complexity
Counting and cutting visit each node a constant number of times, so time is O(n+k).
The result array uses O(k) space, and nodes are relinked in place.

## Edge cases
When k exceeds n, trailing parts are empty.
An empty list returns k null entries.
Earlier parts receive extras before later parts.

## Common mistakes
Detach the tail of every nonempty part.
Do not allocate replacement nodes.
Use the remainder only for the first parts.

## Language notes
Python returns a list of heads.
Java returns a `ListNode[]` and keeps the same original nodes.
