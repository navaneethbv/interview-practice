## Intuition

A linked list stores each value with a pointer to the next node.
A sentinel node before the first real node makes insertion and deletion at the head use the same logic as every other index.

## Brute force

An array supports indexed reads quickly, but inserting or deleting near the front shifts many values.
Copying an array for each operation can take O(n) time and does not model the required linked structure.

## Approach

1. Keep a sentinel head and a size counter.
2. Walk to the node immediately before an insertion or deletion position.
3. Splice one node into or out of the next pointer.
4. Return -1 for invalid reads and ignore invalid deletions or insertions beyond the current size.

## Walkthrough

Example 1:

addAtHead(1) creates the list [1].
addAtTail(3) appends 3, producing [1,3].
addAtIndex(1,2) links 2 between 1 and 3, producing [1,2,3].
get(1) returns 2.
deleteAtIndex(1) bypasses node 2, leaving [1,3].
The final get(1) returns 3.

## Complexity

Each operation walks at most O(n) nodes and uses O(1) extra space.
The list itself uses O(n) node storage.
The Python and Java references both use a sentinel and one linear predecessor search.

## Edge cases

Index zero inserts immediately after the sentinel.
An index equal to size is valid for insertion at the tail.
Negative indices and indices beyond size follow the specified no-op or -1 behavior.

## Common mistakes

Do not treat an index equal to size as a valid read.
Do not decrement size before reconnecting the deleted node.
Do not forget that a negative insertion index means the head in this contract.

## Language notes

Python uses a small private node class with value and next fields.
Java uses a private static node class and keeps all required public operation names unchanged.
