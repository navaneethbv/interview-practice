class Solution:
    def generateTrees(self, n):
        return self._build(1, n)

    def _build(self, low, high):
        if low > high:
            return [None]
        trees = []
        for value in range(low, high + 1):
            left_trees = self._build(low, value - 1)
            right_trees = self._build(value + 1, high)
            for left in left_trees:
                for right in right_trees:
                    node = TreeNode(value)
                    node.left = left
                    node.right = right
                    trees.append(node)
        return trees
