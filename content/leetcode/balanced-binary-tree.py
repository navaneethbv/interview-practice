class Solution:
    def isBalanced(self, root):
        height = {None: 0}
        pending = [(root, False)]
        while pending:
            node, ready = pending.pop()
            if node is None:
                continue
            if not ready:
                pending.append((node, True))
                pending.append((node.left, False))
                pending.append((node.right, False))
                continue
            left_height = height[node.left]
            right_height = height[node.right]
            if abs(left_height - right_height) > 1:
                return False
            height[node] = 1 + max(left_height, right_height)
        return True
