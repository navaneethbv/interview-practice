class Solution:
    def treeToDoublyList(self, root):
        if root is None: return None
        stack=[]; node=root; first=previous=None
        while node or stack:
            while node: stack.append(node); node=node.left
            node=stack.pop(); right=node.right
            if previous: previous.right=node; node.left=previous
            else: first=node
            previous=node; node=right
        previous.right=first; first.left=previous
        return first
