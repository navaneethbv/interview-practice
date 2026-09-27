# Insert into a Sorted Circular List

Insert one new node holding `insertVal` into a circular singly linked list whose values are sorted around the circle.
The given `head` may point anywhere in that circle.
Keep the sorted circular order and return the original head when the list is nonempty.
For an empty list, create a node that points to itself and return it.
The testcase displays one complete traversal starting at the returned head.
A `Node` has `val` and `next`, and its constructor accepts `Node(value, next)`.

## Examples

```text
Input: head = [3,4,1], insertVal = 2
Output: [3,4,1,2]
Explanation: Insert 2 between 1 and 3, preserving the original head.
```

```text
Input: head = [], insertVal = 7
Output: [7]
Explanation: The new node links back to itself.
```

## Constraints

- The list contains between 0 and 5000 nodes.
- Values and insertVal are signed 32-bit integers.
- Duplicate values are allowed.
- A nonempty input has exactly one circular chain and at most one decrease in value around it.
