class Solution:
    def longestConsecutive(self, root):
        if root is None:
            return 0
        stack = [(root, False)]
        lengths = {}
        best = 0
        while stack:
            node, visited = stack.pop()
            if not visited:
                stack.append((node, True))
                if node.left is not None:
                    stack.append((node.left, False))
                if node.right is not None:
                    stack.append((node.right, False))
                continue
            increasing, decreasing = self._runs(node, lengths)
            lengths[node] = (increasing, decreasing)
            best = max(best, increasing + decreasing - 1)
        return best

    def _runs(self, node, lengths):
        increasing = 1
        decreasing = 1
        for child in (node.left, node.right):
            if child is None:
                continue
            child_increasing, child_decreasing = lengths[child]
            if child.val == node.val + 1:
                increasing = max(increasing, child_increasing + 1)
            if child.val == node.val - 1:
                decreasing = max(decreasing, child_decreasing + 1)
        return increasing, decreasing
