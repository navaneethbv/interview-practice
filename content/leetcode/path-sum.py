class Solution:
    def hasPathSum(self, root, targetSum):
        if root is None:
            return False

        stack = [(root, targetSum)]
        while stack:
            node, remaining_sum = stack.pop()
            remaining_sum -= node.val
            if node.left is None and node.right is None and remaining_sum == 0:
                return True
            if node.right:
                stack.append((node.right, remaining_sum))
            if node.left:
                stack.append((node.left, remaining_sum))

        return False
