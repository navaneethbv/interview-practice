class Solution:
    def largestValues(self, root):
        current_level = [root] if root else []
        largest_by_level = []
        while current_level:
            largest_by_level.append(max(node.val for node in current_level))
            next_level = []
            for node in current_level:
                if node.left:
                    next_level.append(node.left)
                if node.right:
                    next_level.append(node.right)
            current_level = next_level
        return largest_by_level
