# Linked List Components

Count maximal consecutive runs of nodes whose values belong to nums.
Only selected nodes connected directly along the list belong to the same component.

## Examples

### Example 1

```text
Input: head = [0, 1, 2, 3], nums = [0, 1, 3]
Output: 2
Explanation: The selected run [0,1] and the isolated selected node 3 form two components.
```

### Example 2

```text
Input: head = [0, 1, 2], nums = [0, 1, 2]
Output: 1
Explanation: All nodes form one selected component.
```

## Constraints

- The list contains n distinct values from 0 through n-1, with 1 <= n <= 10,000.
- nums contains 1 through n distinct values from the list.
