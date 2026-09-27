class Solution:
    def subtreeWithAllDeepest(self, root):
        return self._visit(root)[1]

    def _visit(self, node):
        if node is None:
            return 0, None
        left_depth, left_root = self._visit(node.left)
        right_depth, right_root = self._visit(node.right)
        if left_depth == right_depth:
            return left_depth + 1, node
        if left_depth > right_depth:
            return left_depth + 1, left_root
        return right_depth + 1, right_root
