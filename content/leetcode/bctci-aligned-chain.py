class Solution:
    def longestAlignedChain(self, root):
        best = 0

        def chain(node, depth):
            nonlocal best
            if node is None:
                return 0
            below = max(chain(node.left, depth + 1), chain(node.right, depth + 1))
            if node.val != depth:
                return 0
            best = max(best, below + 1)
            return below + 1

        chain(root, 0)
        return best
