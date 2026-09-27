class Solution:
    def lowestCommonAncestor(self, root, p, q):
        lower = min(p.val, q.val)
        upper = max(p.val, q.val)
        while root:
            if root.val < lower:
                root = root.right
            elif root.val > upper:
                root = root.left
            else:
                return root
