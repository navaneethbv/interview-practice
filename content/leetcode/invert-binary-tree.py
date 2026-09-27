class Solution:
    def invertTree(self,root):
        stack=[root] if root else []
        while stack:
            node=stack.pop()
            node.left,node.right=node.right,node.left
            stack.extend(x for x in (node.left,node.right) if x)
        return root
