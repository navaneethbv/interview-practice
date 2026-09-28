# Sublist Reversal

Given the head of a singly linked list and indices `0 <= left < right`, reverse the nodes from index `left` through index `right` in place and return the head.
If `left` is past the last index, leave the list unchanged; if only `right` is past it, reverse from `left` to the end.

## Examples

### Example 1

```text
Input: head = [1, 2, 3, 4, 5], left = 1, right = 3
Output: [1, 4, 3, 2, 5]
```

### Example 2

```text
Input: head = [1, 2, 3, 4, 5], left = 2, right = 7
Output: [1, 2, 5, 4, 3]
```

## Constraints

- At most `10^5` nodes.
- `0 <= left < right <= 10^9`
