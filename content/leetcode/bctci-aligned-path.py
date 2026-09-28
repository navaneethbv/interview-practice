class Solution:
    def longestAlignedPath(self, root):
        best = 0

        def chain(node, depth):
            nonlocal best
            if node is None:
                return 0
            left = chain(node.left, depth + 1)
            right = chain(node.right, depth + 1)
            if node.val != depth:
                return 0
            best = max(best, left + right + 1)
            return max(left, right) + 1

        chain(root, 0)
        return best
