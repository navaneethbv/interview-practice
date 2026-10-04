## Intuition

At a BST node, the comparison with target identifies the only subtree that can still contain the target.
Equality is handled immediately, so duplicates do not create any ambiguity in deciding which direction to search.

## Brute force

A general binary-tree traversal checks every node in the worst case.
A BST search can discard an entire subtree at each comparison by using the ordering guarantee.

## Approach

Start `node` at root.
While it is non-null, return true if its value equals target.
Otherwise move left when target is smaller and right when target is larger.
Return false if the chosen branch reaches null.
When target is smaller, every value in the right subtree is at least the current value and therefore too large.
The symmetric argument excludes the left subtree for a larger target.
Thus the search never discards a possible matching value.

## Walkthrough

```text
Input: root = [5, 2, 9, null, 4, 9, 11, null, null, null, 9], target = 4
Output: true
```

Example 1 starts at value 5 while searching for 4.
Since 4 is smaller, move to the left child with value 2.
Since 4 is larger than 2, move to its right child with value 4.
Equality now succeeds and the method returns true.
The large right subtree rooted at 9 is never inspected.

## Complexity

Time is O(h), where h is tree height.
This is O(log n) for a balanced tree but can be O(n) for a skewed tree.
The iterative implementation uses O(1) extra space and leaves every tree link unchanged.

## Edge cases

An empty tree returns false.
A target equal to the root returns immediately.
Targets outside the stored value range eventually reach a missing child.
Duplicates still require only a boolean answer.

## Common mistakes

Do not promise logarithmic time without a balance guarantee.
Searching both subtrees discards the main benefit of BST order.

## Language notes

Python updates the node reference with a conditional expression.
Java uses the equivalent ternary operator; neither implementation allocates a traversal stack or recurses.
