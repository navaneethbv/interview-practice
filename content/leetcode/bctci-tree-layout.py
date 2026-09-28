from collections import Counter


class Solution:
    def maxStacked(self, root):
        counts = Counter()
        stack = [(root, 0, 0)]
        while stack:
            node, row, col = stack.pop()
            counts[(row, col)] += 1
            if node.left:
                stack.append((node.left, row + 1, col))
            if node.right:
                stack.append((node.right, row, col + 1))
        return max(counts.values())
