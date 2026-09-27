class Solution:
    def boundaryOfBinaryTree(self, root):
        if self._is_leaf(root):
            return [root.val]

        boundary = [root.val]
        boundary.extend(self._edge_values(root.left, True))
        boundary.extend(self._leaf_values(root))
        right_values = self._edge_values(root.right, False)
        boundary.extend(reversed(right_values))
        return boundary

    @staticmethod
    def _is_leaf(node):
        return node.left is None and node.right is None

    def _edge_values(self, node, is_left_boundary):
        values = []
        while node is not None:
            if not self._is_leaf(node):
                values.append(node.val)
            if is_left_boundary:
                node = node.left or node.right
            else:
                node = node.right or node.left
        return values

    def _leaf_values(self, root):
        values = []
        stack = [root]
        while stack:
            node = stack.pop()
            if self._is_leaf(node):
                values.append(node.val)
            if node.right is not None:
                stack.append(node.right)
            if node.left is not None:
                stack.append(node.left)
        return values
