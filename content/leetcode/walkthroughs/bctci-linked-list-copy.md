## Intuition

Copying values is not enough if the returned nodes still belong to the original list.
Build a separate chain of fresh nodes while traversing the input once, preserving order without changing original links.

## Brute force

Returning head or copying only the head reference is a shallow alias, not a valid copy.
Finding the end of the growing copy for every append would take quadratic time.

## Approach

Create a dummy node and set tail to it.
For each input node, allocate a new ListNode with the same val, assign it to tail.next, then advance both the copy tail and input cursor.
Return dummy.next after the traversal.
The dummy provides a fixed attachment point before the first real copied node and is not part of the returned list.
After each iteration, the new chain contains exactly the processed input prefix, in the same order, with distinct node identities.

## Walkthrough

```text
Input: head = [1, 2, 3]
Output: [1, 2, 3]
```

Example 1 begins with source values 1, 2, and 3.
Allocate a fresh node containing 1 after dummy, then append fresh nodes containing 2 and 3.
The copy tail advances after every allocation, so each new value follows its predecessor.
Returning dummy.next exposes `[1, 2, 3]`, but none of those nodes is an original source node.

## Complexity

For n input nodes, time is O(n).
The returned copy requires O(n) new node storage.
Working space excluding the copy is O(1), consisting of cursors and the dummy node.

## Edge cases

An empty input leaves dummy.next null and returns null.
A singleton still requires a new node.
Duplicate values must be copied as separate nodes, preserving their order and count.

## Common mistakes

Do not attach an original node to the output chain.
Returning dummy itself would introduce an extra leading zero value.

## Language notes

Both references use the harness-provided ListNode helper and its val field.
Python advances its local head variable; Java uses a separate node cursor, with neither changing the caller's node links.
