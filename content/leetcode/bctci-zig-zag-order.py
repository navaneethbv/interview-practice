class Solution:
    def zigZagOrder(self, root):
        order = []
        level = [root] if root else []
        depth = 0
        while level:
            values = [node.val for node in level]
            order.extend(values if depth % 2 == 0 else reversed(values))
            level = [child for node in level for child in (node.left, node.right) if child]
            depth += 1
        return order
