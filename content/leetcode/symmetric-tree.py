class Solution:
    def isSymmetric(self, root):
        stack=[(root.left,root.right)]
        while stack:
            a,b=stack.pop()
            if not a or not b:
                if a is not b:return False
                continue
            if a.val!=b.val:return False
            stack.extend(((a.left,b.right),(a.right,b.left)))
        return True
