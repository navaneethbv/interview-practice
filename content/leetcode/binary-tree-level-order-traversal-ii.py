from collections import deque


class Solution:
    def levelOrderBottom(self, root):
        if root is None:
            return []
        queue = deque([root])
        levels = []
        while queue:
            levels.append(self._next_level(queue))
        return levels[::-1]

    def _next_level(self, queue):
        values = []
        for _ in range(len(queue)):
            node = queue.popleft()
            values.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return values
