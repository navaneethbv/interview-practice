class Solution:
    def flatten(self,root):
        stack=[root] if root else []
        previous=None
        while stack:
            node=stack.pop()
            if node.right: stack.append(node.right)
            if node.left: stack.append(node.left)
            if previous: previous.left=None; previous.right=node
            previous=node
        if previous: previous.left=None; previous.right=None
