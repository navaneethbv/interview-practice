class Solution:
    def isSubtree(self,root,subRoot):
        def same(a,b):
            if not a or not b: return a is b
            return a.val==b.val and same(a.left,b.left) and same(a.right,b.right)
        stack=[root]
        while stack:
            n=stack.pop()
            if same(n,subRoot): return True
            stack.extend(c for c in (n.left,n.right) if c)
        return False
