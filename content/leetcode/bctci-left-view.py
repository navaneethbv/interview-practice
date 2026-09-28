class Solution:
    def leftView(self, root):
        view = []
        level = [root] if root else []
        while level:
            view.append(level[0].val)
            level = [child for node in level for child in (node.left, node.right) if child]
        return view
