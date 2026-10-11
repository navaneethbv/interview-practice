# Linked List Random Node

`Solution(head)` receives a non-empty singly linked list.
`getRandom()` returns the value of a node chosen uniformly at random, every node having the same probability.
Answers are checked for membership and, over many calls, for uniformity.

Void operations display `null`.
Each test uses a fresh instance.

Any valid answer is accepted.

## Constraints

- 1 <= list length <= 10^4
- At most 10^4 calls to getRandom.

## Examples

### Example 1

```text
Input: ctor = [[1, 2, 3]], ops = ["getRandom", "getRandom", "getRandom"], args = [[], [], []]
Output: [1, 2, 2]
Explanation: Any value from the list is a valid answer for each call.
```
