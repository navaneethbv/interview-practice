class Solution:
    def pathSum(self, root, targetSum):
        paths = []
        current_path = []
        pending = [(root, targetSum, False)] if root else []

        while pending:
            node, remaining_sum, leaving = pending.pop()
            if leaving:
                current_path.pop()
                continue

            current_path.append(node.val)
            remaining_sum -= node.val
            if not node.left and not node.right and remaining_sum == 0:
                paths.append(current_path.copy())

            pending.append((node, remaining_sum, True))
            if node.right:
                pending.append((node.right, remaining_sum, False))
            if node.left:
                pending.append((node.left, remaining_sum, False))
        return paths
