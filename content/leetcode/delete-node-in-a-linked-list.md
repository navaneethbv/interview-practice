# Delete a Node Given Only That Node

You receive a reference to a non-tail node in a singly linked list, without a reference to the head.
Remove that node's value so that the list's remaining values retain their order.
The method returns nothing; the judge inspects the full list after the call.
The testcase object provides `values` for the initial list and `at` for the zero-based node passed to your method.

## Examples

```text
Input: node = {"values":[4,7,2,9],"at":1}
Output: [4,2,9]
Explanation: Remove the value 7 while preserving the remaining sequence.
```

```text
Input: node = {"values":[1,2,3],"at":0}
Output: [2,3]
Explanation: The selected node is the head, but the method still receives only that node.
```

## Constraints

- 2 <= number of nodes <= 1000
- Values are distinct signed 32-bit integers.
- The selected node exists and is not the last node.
