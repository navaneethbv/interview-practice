class Solution:
    def maxPathSum(self, root):
        best = float('-inf')
        gain = {}
        stack = [(root, False)]
        while stack:
            node, expanded = stack.pop()
            if not node:
                continue
            if not expanded:
                stack.extend([(node, True), (node.right, False), (node.left, False)])
                continue
            left = max(0, gain.get(node.left, 0))
            right = max(0, gain.get(node.right, 0))
            best = max(best, node.val + left + right)
            gain[node] = node.val + max(left, right)
        return best
