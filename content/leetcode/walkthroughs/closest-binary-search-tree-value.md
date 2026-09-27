## Intuition

At every tree node, the binary-search ordering tells which subtree can contain values closer on the target's side.
Keep the best value seen so far before descending.
If target is smaller, only the left subtree can offer a smaller candidate.
If target is equal or larger, follow the right subtree.
When distances tie, the smaller value wins.

## Brute force

An inorder traversal could visit every node and compare its distance with the target.
That takes O(n) time and O(h) recursion or stack space for n nodes and height h.
It ignores the ordering information that can discard half of a balanced tree's candidates.
The directed search visits only one root-to-leaf path.

## Approach

1. Initialize best_value with the root value.
2. At each current node, compute its distance and compare it with the current best distance.
3. Update best_value for a smaller distance or an equal distance with a smaller value.
4. Use the target comparison to select the next child.
5. Return the best value after the path ends.

## Walkthrough

For Example 1, the tree contains values 4, 2, 6, 1, 3, 5, and 7, with target 3.6.
Start with best value 4, whose distance is 0.4.
Move left to 2, then right to 3, and compare each distance with 0.4.
The value 3 is 0.6 away, so 4 remains best.
The search then follows the right branch of 3 and ends, returning 4.
For Example 2, target 2.5 ties values 2 and 3, so the smaller value 2 remains selected.

## Complexity

The search takes O(h) time for tree height h.
It uses O(1) extra space because it follows child links iteratively.
In a balanced tree h is O(log n), while a skewed tree can make h O(n).

## Edge cases

A one-node tree is returned for every target.
Targets below or above all values follow a boundary path and return the nearest boundary value.
An exact match has distance zero.
Tie handling is explicit and favors the smaller node value.

## Common mistakes

Do not search both subtrees after the BST direction is known.
Do not compare only the signed difference, because absolute distance is required.
Do not forget the smaller-value tie rule.
Do not initialize the best value to an external sentinel that may lie outside the tree.

## Language notes

Python compares distances as numeric values and uses a short tie condition.
Java computes distances as doubles because target is double.
Both references preserve the required closestValue signature.
