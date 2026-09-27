class Solution:
    def diameterOfBinaryTree(self, root):
        height = {None: 0}
        pending = [(root, False)]
        best = 0
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
            best = max(best, left_height + right_height)
            height[node] = 1 + max(left_height, right_height)
        return best
