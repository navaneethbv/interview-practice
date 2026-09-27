# Validate Stack Sequences

Push values in pushed order, interleaving pops whenever desired.
Return whether the popped order can be produced by a stack that starts and ends empty.

## Constraints

- Both arrays have the same length from 1 to 1000.
- pushed contains distinct integers and popped is a permutation of it.

## Examples

### Example 1

```text
Input: pushed = [1, 2, 3], popped = [2, 3, 1]
Output: true
Explanation: Push 1, push/pop 2, push/pop 3, then pop 1.
```

### Example 2

```text
Input: pushed = [1, 2, 3], popped = [3, 1, 2]
Output: false
Explanation: After popping 3, value 2 blocks access to 1.
```
