# Hidden Message

Each node of a binary tree carries a two-character text; the node's `val` is its index into `texts`.
The first character of a text is `b`, `i`, or `a`, and the second character belongs to a hidden message.
Read the message recursively:

- `b`: the node's character, then its left subtree, then its right subtree.
- `i`: the left subtree, then the node's character, then the right subtree.
- `a`: the left subtree, then the right subtree, then the node's character.

Return the hidden message.

## Examples

### Example 1

```text
Input: root = [0, 1, 2, 3, 4, 5, null, 6, 7, null, null, null, 8], texts = ["bn", "i_", "a!", "ae", "it", "br", "bi", "bc", "ay"]
Output: "nice_try!"
```

### Example 2

```text
Input: root = [0], texts = ["bx"]
Output: "x"
```

## Constraints

- `0 <= number of nodes <= 10^5` and the height is at most 500.
- Node values are distinct indices into `texts`.
