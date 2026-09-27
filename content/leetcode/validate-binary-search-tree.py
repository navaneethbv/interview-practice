class Solution:
    def isValidBST(self, root):
        stack = [(root, float('-inf'), float('inf'))]
        while stack:
            node, lower, upper = stack.pop()
            if not node:
                continue
            if not lower < node.val < upper:
                return False
            stack.extend([(node.left, lower, node.val), (node.right, node.val, upper)])
        return True
