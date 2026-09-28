class Solution:
    def searchBST(self, root, val):
        while root is not None and root.val != val:
            if val < root.val:
                root = root.left
            else:
                root = root.right
        return root
