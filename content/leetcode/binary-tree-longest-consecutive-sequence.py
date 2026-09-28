class Solution:
    def longestConsecutive(self, root):
        if root is None:
            return 0
        best = 0
        stack = [(root, 1)]
        while stack:
            node, length = stack.pop()
            best = max(best, length)
            for child in (node.left, node.right):
                if child is not None:
                    next_length = length + 1 if child.val == node.val + 1 else 1
                    stack.append((child, next_length))
        return best
