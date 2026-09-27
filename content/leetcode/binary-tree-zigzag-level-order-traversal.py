from collections import deque
class Solution:
    def zigzagLevelOrder(self, root):
        if not root:
            return []
        pending = deque([root])
        levels = []
        while pending:
            level_values = []
            for _ in range(len(pending)):
                node = pending.popleft()
                level_values.append(node.val)
                if node.left:
                    pending.append(node.left)
                if node.right:
                    pending.append(node.right)
            if len(levels) % 2 == 1:
                level_values.reverse()
            levels.append(level_values)
        return levels
