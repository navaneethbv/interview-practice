class Solution:
    def closestValue(self, root, target):
        best=root.val
        while root:
            if (abs(root.val-target),root.val)<(abs(best-target),best): best=root.val
            root=root.left if target<root.val else root.right
        return best
