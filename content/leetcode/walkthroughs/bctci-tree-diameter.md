## Intuition

The longest path through a node joins its deepest left branch to its deepest right branch.
Child heights therefore provide enough information to evaluate every possible joining point without enumerating endpoint pairs.

## Brute force

Computing distances for every pair of tree nodes takes quadratic time.
A bottom-up height calculation shares the work across all possible diameter paths.

## Approach

Build an order list starting at root index zero and append each node's existing children.
Reverse that order so every child is processed before its parent.
For each node, read child heights a and b, using zero for missing children.
Update best with a + b, then store `1 + max(a, b)` as the current node's height.
Heights count nodes downward, so a + b counts edges through the current parent correctly.
Return zero immediately for an empty tree.

## Walkthrough

```text
Input: [["a", "b", "c"], [[1, 2], [-1, -1], [-1, -1]]]
Output: 2
```

Example 1 has root a with two leaf children b and c.
Each leaf receives height one and contributes diameter candidate zero.
At the root, both child heights are one, yielding candidate 1 + 1 = 2 edges.
The path b to a to c realizes that value.
Labels identify nodes for the fixture but never enter distance calculations.

## Complexity

Order construction and reverse processing each visit n nodes once, giving O(n) time.
The order and height arrays use O(n) extra space.
The iterative method avoids recursion depth problems on a long chain.

## Edge cases

An empty tree and a singleton both have diameter zero.
A one-sided chain of n nodes has n - 1 edges.
The maximum path may lie entirely inside a subtree.

## Common mistakes

Do not return node count instead of edge count.
Do not assume the root lies on every diameter.

## Language notes

Python extends its order list during iteration and then traverses it in reverse.
Java uses an index-controlled growing list and the same reverse dependency order, with -1 reserved for absent children.
