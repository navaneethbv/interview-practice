class Solution:
    def lowestCommonAncestor(self,root,p,q):
        lo,hi=sorted((p.val,q.val))
        while root:
            if root.val<lo: root=root.right
            elif root.val>hi: root=root.left
            else: return root
