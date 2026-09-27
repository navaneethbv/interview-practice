class Solution:
    def levelOrder(self, root):
        queue = [root] if root else []
        result = []
        while queue:
            result.append([node.val for node in queue])
            queue = [child for node in queue for child in (node.left, node.right) if child]
        return result
