class Solution:
    def isValidBst(self, root):
        stack = [(root, float("-inf"), float("inf"))]
        while stack:
            node, low, high = stack.pop()
            if node is None:
                continue
            if not low <= node.val <= high:
                return False
            stack.append((node.left, low, node.val))
            stack.append((node.right, node.val, high))
        return True
