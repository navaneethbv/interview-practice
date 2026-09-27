class Solution:
    def rightSideView(self, root):
        level = [root] if root else []; result = []
        while level:
            result.append(level[-1].val)
            level = [child for node in level for child in (node.left,node.right) if child]
        return result
