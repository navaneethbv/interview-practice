class Solution:
    def mostProlificLevel(self, root):
        if root is None:
            return -1
        sizes = []
        level = [root]
        while level:
            sizes.append(len(level))
            level = [child for node in level for child in (node.left, node.right) if child]
        sizes.append(0)
        best = 0
        for depth in range(1, len(sizes) - 1):
            if sizes[depth + 1] * sizes[best] > sizes[best + 1] * sizes[depth]:
                best = depth
        return best
