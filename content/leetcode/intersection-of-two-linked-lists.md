# Intersection of Two Linked Lists

Return the first node shared by two singly linked lists, or null when they do not intersect.
Nodes intersect by identity, not merely by having equal values.
Do not change the input links.
For test input, `headA` is a full list; `headB.values` supplies its separate prefix and `headB.tail` selects the zero-based node in A that follows that prefix.
A null tail creates a completely separate B list.
The judge verifies node identity and displays the returned node's suffix.

## Examples

```text
Input: headA = [2,5,8,9], headB = {"values":[7],"tail":2}
Output: [8,9]
Explanation: B is 7 followed by the same nodes holding 8 and 9 in A.
```

```text
Input: headA = [1,3], headB = {"values":[1,3],"tail":null}
Output: null
Explanation: Equal values in separate nodes do not create an intersection.
```

## Constraints

- Both complete lists contain between 1 and 30,000 nodes.
- Each list is acyclic.
- Node values are nonnegative integers.
- A numeric tail index must identify an existing node in A.
