class Solution:
    def maxDepth(self, root):
        if not root:
            return 0
        queue = [root]
        depth = 0
        while queue:
            depth += 1
            queue = [child for node in queue for child in (node.left, node.right) if child]
        return depth
