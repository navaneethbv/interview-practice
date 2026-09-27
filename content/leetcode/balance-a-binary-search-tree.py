class Solution:
    def balanceBST(self, root):
        values = []
        stack = []
        node = root
        while node or stack:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            values.append(node.val)
            node = node.right
        return self._build(values, 0, len(values))

    def _build(self, values, low, high):
        if low >= high:
            return None
        middle = (low + high) // 2
        node = TreeNode(values[middle])
        node.left = self._build(values, low, middle)
        node.right = self._build(values, middle + 1, high)
        return node
