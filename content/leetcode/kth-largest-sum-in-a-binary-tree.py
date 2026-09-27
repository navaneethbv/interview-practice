from collections import deque


class Solution:
    def kthLargestLevelSum(self, root, k):
        queue = deque([root])
        level_sums = []
        while queue:
            level_sums.append(self._next_level(queue))
        if len(level_sums) < k:
            return -1
        return sorted(level_sums, reverse=True)[k - 1]

    def _next_level(self, queue):
        total = 0
        for _ in range(len(queue)):
            node = queue.popleft()
            total += node.val
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return total
