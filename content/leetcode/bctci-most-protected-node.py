class Solution:
    def mostProtected(self, root):
        heights = {}

        def height(node):
            if node is None:
                return -1
            heights[node] = 1 + max(height(node.left), height(node.right))
            return heights[node]

        height(root)
        best = 0
        level, depth = [root], 0
        while level:
            for position, node in enumerate(level):
                protection = min(depth, heights[node], position, len(level) - 1 - position)
                best = max(best, protection)
            level = [child for node in level for child in (node.left, node.right) if child]
            depth += 1
        return best
