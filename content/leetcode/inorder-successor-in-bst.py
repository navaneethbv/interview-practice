class Solution:
    def inorderSuccessor(self, root, p):
        successor = None
        while root:
            if root.val > p.val:
                successor = root
                root = root.left
            else:
                root = root.right
        return successor
