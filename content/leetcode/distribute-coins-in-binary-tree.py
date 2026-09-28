class Solution:
    def distributeCoins(self, root):
        self.moves = 0
        self._balance(root)
        return self.moves

    def _balance(self, node):
        if node is None:
            return 0
        left_excess = self._balance(node.left)
        right_excess = self._balance(node.right)
        self.moves += abs(left_excess) + abs(right_excess)
        return node.val + left_excess + right_excess - 1
